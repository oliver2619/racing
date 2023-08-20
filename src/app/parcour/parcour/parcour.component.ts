import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'r-parcour',
  templateUrl: './parcour.component.html',
  styleUrls: ['./parcour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcourComponent {

  lengthValues: number[] = [3];
  curveValues: number[] = [15];

  private selectedTile: number | undefined;

  get canDecRounds(): boolean {
    return this.canModify && this.numberOfRounds > 1;
  }

  get canIncRounds(): boolean {
    return this.canModify && this.numberOfRounds < 10;
  }

  get canModify(): boolean {
    return this.appService.canChangeParcour;
  }

  get downloadData(): string {
    return btoa(JSON.stringify(this.appService.saveParcourAsJson()));
  }

  get hasCurveSelected(): boolean {
    return this.selectedTile !== undefined && this.appService.parcourElements[this.selectedTile].isCurve;
  }

  get hasSelection(): boolean {
    return this.selectedTile !== undefined;
  }

  get isComplete(): boolean {
    return this.appService.isParcourComplete;
  }

  get numberOfFields(): number {
    return this.appService.numberOfParcourFields;
  }

  get numberOfRounds(): number {
    return this.appService.numberOfRounds;
  }

  get selectedCurveSpeed(): number {
    if (this.selectedTile !== undefined) {
      const t = this.appService.parcourElements[this.selectedTile];
      return t.curveSpeed !== undefined ? t.curveSpeed : 0;
    } else {
      return 0;
    }
  }

  get selectedTileLength(): number {
    return this.selectedTile !== undefined ? this.appService.parcourElements[this.selectedTile].length : 0;
  }

  constructor(private readonly appService: AppService) { }

  decRounds() {
    this.appService.numberOfRounds--;
  }

  incRounds() {
    this.appService.numberOfRounds++;
  }

  onSelectTile(i: number | undefined) {
    this.selectedTile = i;
    if (this.selectedTile !== undefined) {
      if (this.appService.parcourElements[this.selectedTile].isCurve) {
        this.lengthValues = [1, 3, 4];
      } else {
        this.lengthValues = [3, 4];
      }
    } else {
      this.lengthValues = [3];
    }
    this.updateCurveValues();
  }

  setCurveSpeed(s: number) {
    if (this.selectedTile !== undefined) {
      const t = this.appService.parcourElements[this.selectedTile];
      if (t.isCurve) {
        this.appService.setParcourElement(this.selectedTile, t.length, s);
      }
    }
  }

  setTileLength(l: number) {
    if (this.selectedTile !== undefined) {
      const t = this.appService.parcourElements[this.selectedTile];
      if (t.isCurve) {
        switch (l) {
          case 1:
            this.appService.setParcourElement(this.selectedTile, l, 11);
            break;
          case 3:
            this.appService.setParcourElement(this.selectedTile, l, 15);
            break;
          case 4:
            this.appService.setParcourElement(this.selectedTile, l, 19);
            break;
          default:
            throw new Error(`Unknown curve length ${l}`);
        }
        this.updateCurveValues();
      } else {
        this.appService.setParcourElement(this.selectedTile, l);
      }
    }
  }

  private updateCurveValues() {
    if (this.selectedTile !== undefined) {
      const t = this.appService.parcourElements[this.selectedTile];
      if (t.isCurve) {
        switch (t.length) {
          case 1:
            this.curveValues = [10, 11, 12];
            break;
          case 3:
            this.curveValues = [14, 15, 16];
            break;
          case 4:
            this.curveValues = [18, 19, 20];
            break;
          default:
            throw new Error(`Unknown curve length ${t.length}`);
        }
      } else {
        this.curveValues = [15];
      }
    } else {
      this.curveValues = [15];
    }
  }
}
