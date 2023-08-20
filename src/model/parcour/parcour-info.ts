import { PositionInfo } from "./position-info";

export interface ParcourInfo {

    readonly name: string;
    readonly fields: number;
    readonly rounds: number;

    getCurve(position: number): number | undefined;

    getStartPosition(position: number): PositionInfo;
}