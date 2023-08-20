export interface RaceResultJson {

    readonly team: string;
    readonly startPosition: number;
    readonly finalPosition: number | undefined;
    readonly fastestLap: number | undefined;
    readonly score: number;
}