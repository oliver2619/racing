import { FieldInfo } from "./field-info";
import { Lane } from "./lane";
import { ParcourElement, ParcourElementData } from "./parcour-element";
import { ParcourElementJson } from "./parcour-element-json";
import { ParcourElementRotation } from "./parcour-element-rotation";

export interface ParcourElementStraightData extends ParcourElementData {
    readonly length: number;
}

export class ParcourElementStraight extends ParcourElement {

    readonly isCurve = false;
    readonly curveSpeed = undefined;
    readonly curveTurn = undefined;
    readonly width: number;
    readonly height: number;
    readonly nextOffsetX: number;
    readonly nextOffsetY: number;

    private constructor(x: number, y: number, readonly endDirection: ParcourElementRotation, readonly length: number) {
        super(x, y, endDirection);
        if ((endDirection & 1) === 1) {
            this.width = this.length;
            this.height = 4;
        } else {
            this.width = 4;
            this.height = this.length;
        }
        switch (endDirection) {
            case ParcourElementRotation.UP:
                this.nextOffsetX = this.x;
                this.nextOffsetY = this.y;
                break;
            case ParcourElementRotation.LEFT:
                this.nextOffsetX = this.x;
                this.nextOffsetY = this.y;
                break;
            case ParcourElementRotation.DOWN:
                this.nextOffsetX = this.x;
                this.nextOffsetY = this.y + this.height;
                break;
            case ParcourElementRotation.RIGHT:
                this.nextOffsetX = this.x + this.width;
                this.nextOffsetY = this.y;
        }
    }

    static newInstance(data: ParcourElementStraightData): ParcourElementStraight {
        return new ParcourElementStraight(data.x, data.y, data.rotation, data.length);
    }

    getCurve(relPosition: number): number | undefined {
        return undefined;
    }

    getField(field: number, lane: Lane): FieldInfo {
        let x = this.x;
        let y = this.y;
        switch (this.rotation) {
            case ParcourElementRotation.UP:
                x += lane === Lane.LEFT ? 1 : 2
                y += this.length - field - 1;
                break;
            case ParcourElementRotation.LEFT:
                x += this.length - field - 1;
                y += lane === Lane.LEFT ? 2 : 1;
                break;
            case ParcourElementRotation.DOWN:
                x += lane === Lane.LEFT ? 2 : 1
                y += field;
                break;
            case ParcourElementRotation.RIGHT:
                x += field;
                y += lane === Lane.LEFT ? 1 : 2;
        }
        return { x, y };
    }

    getLaneLength(lane: Lane): number {
        return this.length;
    }

    save(): ParcourElementJson {
        const ret: ParcourElementJson = {
            length: this.length
        };
        return ret;
    }

    withEndDirection(direction: ParcourElementRotation): ParcourElement {
        return new ParcourElementStraight(this.x, this.y, direction, this.length);
    }

    withLength(length: number): ParcourElement {
        return new ParcourElementStraight(this.x, this.y, this.endDirection, length);
    }

    withPosition(x: number, y: number): ParcourElement {
        return new ParcourElementStraight(x, y, this.endDirection, this.length);
    }

    withRotation(rotation: ParcourElementRotation): ParcourElement {
        return new ParcourElementStraight(this.x, this.y, rotation, this.length);
    }
}