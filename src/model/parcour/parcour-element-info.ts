import { ParcourElementRotation } from "./parcour-element-rotation";

export interface ParcourElementInfo {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly length: number;
    readonly rotation: ParcourElementRotation;
    readonly endDirection: ParcourElementRotation;
    readonly isCurve: boolean;
    readonly curveSpeed: number | undefined;
}