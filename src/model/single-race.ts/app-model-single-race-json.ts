import { AppModelBaseJson } from "../app-model-base-json";
import { ParcourJson } from "../parcour/parcour-json";

export interface AppModelSingleRaceJson extends AppModelBaseJson {
    readonly version: 1;
    readonly state: string;
    readonly parcour: ParcourJson;
}