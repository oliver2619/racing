import { ParcourElementJson } from "./parcour-element-json";

export interface ParcourJson {
    readonly version: 1;
    readonly name: string;
    readonly rounds: number;
    readonly rotation: number;
    readonly elements: ParcourElementJson[];
}