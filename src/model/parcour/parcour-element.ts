import { CurveTurn } from "./curve-turn";
import { FieldInfo } from "./field-info";
import { Lane } from "./lane";
import { ParcourElementInfo } from "./parcour-element-info";
import { ParcourElementJson } from "./parcour-element-json";
import { ParcourElementRotation } from "./parcour-element-rotation";

export interface ParcourElementData {
    x: number;
    y: number;
    rotation: ParcourElementRotation;
}

export abstract class ParcourElement implements ParcourElementInfo {

    abstract readonly isCurve: boolean;
    abstract readonly curveSpeed: number | undefined;
    abstract readonly curveTurn: CurveTurn | undefined;
    abstract readonly length: number;
    abstract readonly endDirection: ParcourElementRotation;
    abstract readonly width: number;
    abstract readonly height: number;
    abstract readonly nextOffsetX: number;
    abstract readonly nextOffsetY: number;

    protected constructor(readonly x: number, readonly y: number, readonly rotation: ParcourElementRotation) { }

    abstract getCurve(relPosition: number): number | undefined;

    abstract getField(field: number, lane: Lane): FieldInfo;

    abstract getLaneLength(lane: Lane): number;

    abstract save(): ParcourElementJson;

    abstract withEndDirection(direction: ParcourElementRotation): ParcourElement;

    abstract withLength(length: number): ParcourElement;

    abstract withPosition(x: number, y: number): ParcourElement;

    abstract withRotation(rotation: ParcourElementRotation): ParcourElement;
}