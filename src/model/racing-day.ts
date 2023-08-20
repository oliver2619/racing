import { RaceResult, RaceResultInfo } from "./race-result";
import { RacingDayJson } from "./racing-day-json";

export interface RacingDayInfo {
    readonly parcour: string;
    readonly results: RaceResultInfo[] | undefined;
}

export class RacingDay implements RacingDayInfo {

    get parcour(): string {
        return this.parcourId;
    }

    private constructor(private readonly parcourId: string, public results: RaceResult[] | undefined) { }

    static load(json: RacingDayJson): RacingDay {
        return new RacingDay(json.parcour, json.results?.map(it => RaceResult.load(it)));
    }

    static newInstance(parcourId: string): RacingDay {
        return new RacingDay(parcourId, undefined);
    }

    clone(): RacingDay {
        return new RacingDay(this.parcourId, this.results !== undefined ? this.results.slice(0) : undefined);
    }

    save(): RacingDayJson {
        const ret: RacingDayJson = {
            parcour: this.parcourId,
            results: this.results !== undefined ? this.results.map(it => it.save()) : undefined
        };
        return ret;
    }
}