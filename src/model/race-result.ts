import { RaceResultJson } from "./race-result-json";
import { TeamIndex } from "./team";

export interface RaceResultInfo {

    readonly team: TeamIndex;
    readonly startPosition: number;
    readonly finalPosition: number | undefined;
    readonly fastestLap: number | undefined;
    readonly score: number;
}

export class RaceResult implements RaceResultInfo {

    private constructor(readonly team: TeamIndex, readonly startPosition: number, readonly finalPosition: number | undefined, readonly fastestLap: number | undefined, readonly score: number) { }

    static load(json: RaceResultJson): RaceResult {
        return new RaceResult((TeamIndex as any)[json.team] as TeamIndex, json.startPosition, json.finalPosition, json.fastestLap, json.score);
    }

    static newInstance(team: TeamIndex, startPosition: number, finalPosition: number | undefined, fastestLap: number | undefined, score: number): RaceResult {
        return new RaceResult(team, startPosition, finalPosition, fastestLap, score);
    }

    save(): RaceResultJson {
        return {
            fastestLap: this.fastestLap,
            finalPosition: this.finalPosition,
            score: this.score,
            startPosition: this.startPosition,
            team: TeamIndex[this.team]
        };
    }
}