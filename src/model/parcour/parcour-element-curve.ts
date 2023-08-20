import { CurveTurn } from "./curve-turn";
import { FieldInfo } from "./field-info";
import { Lane } from "./lane";
import { ParcourElement, ParcourElementData } from "./parcour-element";
import { ParcourElementJson } from "./parcour-element-json";
import { ParcourElementRotation } from "./parcour-element-rotation";

export interface ParcourElementCurveData extends ParcourElementData {
    length: number;
    endDirection: ParcourElementRotation;
    curveSpeed: number;
    curveTurn: CurveTurn;
};

export class ParcourElementCurve extends ParcourElement {

    readonly isCurve = true;
    readonly width: number;
    readonly height: number;
    readonly nextOffsetX: number;
    readonly nextOffsetY: number;

    private constructor(x: number, y: number, rotation: ParcourElementRotation, readonly endDirection: ParcourElementRotation, readonly length: number, readonly curveTurn: CurveTurn, public curveSpeed: number) {
        super(x, y, rotation);
        if (this.length === 4) {
            this.width = 5;
            this.height = 5;
            switch (this.endDirection) {
                case ParcourElementRotation.UP:
                    this.nextOffsetX = this.curveTurn === CurveTurn.RIGHT ? this.x : (this.x + 1);
                    this.nextOffsetY = this.y;
                    break;
                case ParcourElementRotation.LEFT:
                    this.nextOffsetX = this.x;
                    this.nextOffsetY = this.curveTurn === CurveTurn.RIGHT ? this.y + 1 : this.y;
                    break;
                case ParcourElementRotation.DOWN:
                    this.nextOffsetX = this.curveTurn === CurveTurn.RIGHT ? this.x + 1 : this.x;
                    this.nextOffsetY = this.y + this.height;
                    break;
                case ParcourElementRotation.RIGHT:
                    this.nextOffsetX = this.x + this.width;
                    this.nextOffsetY = this.curveTurn === CurveTurn.RIGHT ? this.y : (this.y + 1);
            }
        } else {
            this.width = 4;
            this.height = 4;
            switch (this.endDirection) {
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
    }

    static newInstance(data: ParcourElementCurveData): ParcourElementCurve {
        return new ParcourElementCurve(data.x, data.y, data.rotation, data.endDirection, data.length, data.curveTurn, data.curveSpeed);
    }

    getCurve(relPosition: number): number | undefined {
        if (this.length > 1) {
            return this.curveSpeed;
        }
        return relPosition === 1 ? this.curveSpeed : undefined;
    }

    getField(field: number, lane: Lane): FieldInfo {
        const inside = this.isInside(lane);
        const off = this.length === 1 ? 0 : -0.5;
        const size = this.length === 1 ? (this.width - 1) : this.width;
        let x = this.x + off;
        let y = this.y + off;
        let r1 = 0;
        let angle = 0;
        switch (this.length) {
            case 1:
                r1 = 1;
                angle = inside ? field / 2 : (field / 3);
                break;
            case 3:
                r1 = 1.5;
                angle = inside ? (field + .5) / 3 : ((field + .5) / 4);
                break;
            case 4:
                r1 = 2.5;
                angle = inside ? (field + .5) / 4 : ((field + .5) / 5);
        }
        angle *= Math.PI / 2;
        const r = inside ? r1 : (r1 + 1);
        const cs = r * Math.cos(angle);
        const sn = r * Math.sin(angle);
        switch (this.endDirection) {
            case ParcourElementRotation.UP:
                y += cs;
                if (this.curveTurn === CurveTurn.LEFT) {
                    x += sn;
                } else {
                    x += size - sn;
                }
                break;
            case ParcourElementRotation.LEFT:
                x += cs;
                if (this.curveTurn === CurveTurn.LEFT) {
                    y += size - sn;
                } else {
                    y += sn;
                }
                break;
            case ParcourElementRotation.DOWN:
                y += size - cs;
                if (this.curveTurn === CurveTurn.LEFT) {
                    x += size - sn;
                } else {
                    x += sn;
                }
                break;
            case ParcourElementRotation.RIGHT:
                x += size - cs;
                if (this.curveTurn === CurveTurn.LEFT) {
                    y += sn;
                } else {
                    y += size - sn;
                }
        }
        return { x, y, curveSpeed: this.curveSpeed };
    }

    getLaneLength(lane: Lane): number {
        if (this.length === 1) {
            return this.isInside(lane) ? 3 : 4;
        } else {
            return this.isInside(lane) ? this.length : (this.length + 1);
        }
    }

    isInside(lane: Lane): boolean {
        return (this.curveTurn === CurveTurn.LEFT && lane === Lane.LEFT) || (this.curveTurn === CurveTurn.RIGHT && lane === Lane.RIGHT);
    }

    save(): ParcourElementJson {
        const ret: ParcourElementJson = {
            length: this.length,
            curve: {
                speed: this.curveSpeed,
                turn: this.curveTurn === CurveTurn.LEFT ? 'l' : 'r'
            }
        };
        return ret;
    }

    withEndDirection(direction: ParcourElementRotation): ParcourElement {
        const delta = direction - this.endDirection;
        const rotation = (4 + delta + this.rotation) % 4;
        return new ParcourElementCurve(this.x, this.y, rotation, direction, this.length, this.curveTurn, this.curveSpeed);
    }

    withLength(length: number): ParcourElement {
        return new ParcourElementCurve(this.x, this.y, this.rotation, this.endDirection, length, this.curveTurn, this.curveSpeed);
    }

    withPosition(x: number, y: number): ParcourElement {
        return new ParcourElementCurve(x, y, this.rotation, this.endDirection, this.length, this.curveTurn, this.curveSpeed);
    }

    withRotation(rotation: ParcourElementRotation): ParcourElement {
        const delta = rotation - this.rotation;
        const endDirection = (4 + delta + this.endDirection) % 4;
        return new ParcourElementCurve(this.x, this.y, rotation, endDirection, this.length, this.curveTurn, this.curveSpeed);
    }
}