import { RaceResultJson } from "./race-result-json";

export interface RacingDayJson {
    parcour: string;
    results: RaceResultJson[] | undefined;
}