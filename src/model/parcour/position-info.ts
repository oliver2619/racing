import { Lane } from "./lane";

export interface PositionInfo {
    readonly tile: number;
    readonly field: number;
    readonly lane: Lane;
}