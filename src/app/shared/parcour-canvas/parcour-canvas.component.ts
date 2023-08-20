import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CurveTurn } from 'src/model/parcour/curve-turn';
import { ParcourElementInfo } from 'src/model/parcour/parcour-element-info';

interface Tile {
	readonly x: number;
	readonly y: number;
	width: number;
	height: number;
	element: string;
	rot: string;
	endDirection: string;
	speed: string;
}

interface ParcourAnimation {
	isFinished: boolean;
	animate: (timeout: number) => void;
}

const EASE_IN_OUT = (f: number) => 3 * f * f - 2 * f * f * f;

class ParcourScrollAnimation implements ParcourAnimation {

	private static readonly DURATION = 0.2;

	isFinished = false;

	private readonly startX: number;
	private readonly startY: number;

	private time = 0;

	constructor(private readonly scrollContainer: HTMLElement, private readonly targetX: number, private readonly targetY: number) {
		this.startX = scrollContainer.scrollLeft;
		this.startY = scrollContainer.scrollTop;
	}

	animate(timeout: number) {
		this.time += timeout;
		if (this.time >= ParcourScrollAnimation.DURATION) {
			this.time = ParcourScrollAnimation.DURATION;
			this.isFinished = true;
		}
		const f = EASE_IN_OUT(this.time / ParcourScrollAnimation.DURATION);
		this.scrollContainer.scrollTo(this.startX + (this.targetX - this.startX) * f, this.startY + (this.targetY - this.startY) * f);
	}
}

@Component({
	selector: 'r-parcour-canvas',
	templateUrl: './parcour-canvas.component.html',
	styleUrls: ['./parcour-canvas.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcourCanvasComponent implements OnDestroy {

	@Input('mode')
	mode: 'edit' | 'readonly' | 'race' = 'race';

	@Output('select')
	readonly onSelect = new EventEmitter<number | undefined>();

	tiles: Tile[] = [];

	private readonly animations: ParcourAnimation[] = [];
	private selection: number | undefined;
	private animation: number | undefined;
	private subscription: Subscription;

	private static readonly GRID_SIZE = 48;

	get curves(): Tile[] {
		return this.appService.parcourElements.filter(e => e.isCurve).map((e, i) => this.parcourElementToTile(e, i === 0));
	}

	get hasSelection(): boolean {
		return this.selection !== undefined && this.selection < this.appService.numberOfParcourTiles;
	}

	get isEditMode(): boolean {
		return this.mode === 'edit';
	}

	get isRaceMode(): boolean {
		return this.mode === 'race';
	}

	get selectedTile(): Tile | undefined {
		return this.selection !== undefined && this.selection < this.appService.numberOfParcourTiles ? this.parcourElementToTile(this.appService.parcourElements[this.selection], false) : undefined;
	}

	get startTile(): Tile {
		return this.parcourElementToTile(this.appService.parcourElements[0], true);
	}


	constructor(private readonly appService: AppService, private readonly element: ElementRef<HTMLElement>, private readonly changeDetectorRef: ChangeDetectorRef) {
		this.subscription = appService.onChangeParcour.subscribe({
			next: () => {
				if (this.selection !== undefined && this.selection >= this.appService.numberOfParcourTiles) {
					this.selectTile(undefined);
				}
				this.updateTiles();
				this.changeDetectorRef.markForCheck();
			}
		});
		this.updateTiles();
	}

	canInsertAfter(i: number): boolean {
		return i < this.tiles.length - 1 || !this.appService.isParcourComplete;
	}

	insertLeftCurve(i: number) {
		this.appService.appendParcourCurve(i, 3, 15, CurveTurn.LEFT);
		this.scrollToTile(i + 1);
		if (this.selection != undefined && this.selection >= i) {
			this.selectTile(this.selection + 1);
		}
	}

	insertRightCurve(i: number) {
		this.appService.appendParcourCurve(i, 3, 15, CurveTurn.RIGHT);
		this.scrollToTile(i + 1);
		if (this.selection != undefined && this.selection >= i) {
			this.selectTile(this.selection + 1);
		}
	}

	insertStraight(i: number) {
		this.appService.appendParcourStraight(i, 4);
		this.scrollToTile(i + 1);
		if (this.selection != undefined && this.selection >= i) {
			this.selectTile(this.selection + 1);
		}
	}

	ngOnDestroy() {
		if (this.animation !== undefined) {
			cancelAnimationFrame(this.animation);
			this.animation = undefined;
		}
		this.subscription.unsubscribe();
	}

	remove(i: number) {
		if (this.selection != undefined) {
			if (this.selection > i) {
				this.selectTile(this.selection - 1);
			} else if (this.selection === i && i === this.appService.numberOfParcourTiles - 1) {
				this.selectTile(undefined);
			}
		}
		this.appService.removeParcourElement(i);
	}

	rotateLeft() {
		this.appService.rotateParcourStartElement((this.appService.parcourStartElementRotation + 1) % 4);
		this.scrollToTile(0);
	}

	rotateRight() {
		this.appService.rotateParcourStartElement((this.appService.parcourStartElementRotation + 3) % 4);
		this.scrollToTile(0);
	}

	selectTile(tile: number | undefined) {
		if (this.isEditMode) {
			const s = tile === undefined || (tile > 0 && tile !== this.selection) ? tile : undefined;
			if (this.selection !== s) {
				this.selection = s;
				if (this.selection !== undefined) {
					this.scrollToTile(this.selection);
				}
				this.onSelect.emit(this.selection);
			}
		}
	}

	private addAnimation(animation: ParcourAnimation) {
		if (animation instanceof ParcourScrollAnimation) {
			const found = this.animations.findIndex(a => a instanceof ParcourScrollAnimation);
			if (found >= 0) {
				this.animations.splice(found, 1);
			}
		}
		this.animations.push(animation);
		if (this.animation === undefined) {
			this.startAnimation();
		}
	}

	private onAnimate(timeout: number) {
		for (let i = 0; i < this.animations.length; ++i) {
			const a = this.animations[i];
			a.animate(timeout);
			if (a.isFinished) {
				this.animations.splice(i, 1);
				--i;
			}
		}
	}

	private parcourElementToTile(el: ParcourElementInfo, isFirst: boolean): Tile {
		const element = isFirst ? 'z' : (el.isCurve ? `k${el.length}` : `g${el.length}`);
		return {
			x: el.x * ParcourCanvasComponent.GRID_SIZE,
			y: el.y * ParcourCanvasComponent.GRID_SIZE,
			width: el.width * ParcourCanvasComponent.GRID_SIZE,
			height: el.height * ParcourCanvasComponent.GRID_SIZE,
			element,
			rot: `r${el.rotation}`,
			endDirection: `r${el.endDirection}`,
			speed: el.isCurve ? String(el.curveSpeed) : ''
		};
	}

	private scrollToTile(tile: number) {
		const tileElement = this.appService.parcourElements[tile];
		const container = this.element.nativeElement;
		const x = tileElement.x * ParcourCanvasComponent.GRID_SIZE - (container.clientWidth - tileElement.width * ParcourCanvasComponent.GRID_SIZE) * .5;
		const y = tileElement.y * ParcourCanvasComponent.GRID_SIZE - (container.clientHeight - tileElement.height * ParcourCanvasComponent.GRID_SIZE) * .5;
		this.addAnimation(new ParcourScrollAnimation(container, x, y));
	}

	private startAnimation() {
		let time = performance.now();
		const animation = () => {
			this.animation = undefined;
			const t = performance.now();
			this.onAnimate((t - time) / 1000);
			time = t;
			if (this.animations.length > 0) {
				this.animation = requestAnimationFrame(animation);
			}
		};
		this.animation = requestAnimationFrame(animation);
	}

	private updateTiles() {
		this.tiles = this.appService.parcourElements.map((e, i) => this.parcourElementToTile(e, i === 0));
	}
}
