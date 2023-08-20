import { AppModelBaseJson } from "../app-model-base-json";
import { RacingDayJson } from "../racing-day-json";

export interface AppModelChampionshipJson extends AppModelBaseJson{
    readonly version: 1;
    readonly state: string;
    readonly racingDays: RacingDayJson[];
    readonly aiLevel: string;
}