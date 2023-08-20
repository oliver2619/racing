import { TeamJson } from "./team-json";

export enum TeamIndex {
    RENAULT, FERRARI, LOTUS, BMW, HONDA, MERCEDES
}

export interface TeamConfiguration {
    readonly name: string;
}

export interface TeamInfo {
    readonly score: number;
    readonly polePositions: number;
    readonly fastestLaps: number;
    readonly championshipRanking: number;
}

export class Team implements TeamInfo {

    private constructor(public score: number, public polePositions: number, public fastestLaps: number, public championshipRanking: number) { }

    static load(json: TeamJson): Team {
        return new Team(json.score, json.polePositions, json.fastestLaps, json.championshipRanking);
    }

    static newInstance(championshipRanking: number): Team {
        return new Team(0, 0, 0, championshipRanking);
    }

    save(): TeamJson {
        const ret: TeamJson = {
            championshipRanking: this.championshipRanking,
            fastestLaps: this.fastestLaps,
            polePositions: this.polePositions,
            score: this.score
        };
        return ret;
    }
}

export const TEAM_CONFIGURATIONS: ReadonlyArray<TeamConfiguration> = Object.freeze([
    {
        name: 'Renault'
    }, {
        name: 'Ferrari'
    }, {
        name: 'Lotus'
    }, {
        name: 'BMW'
    }, {
        name: 'Honda'
    }, {
        name: 'Mercedes'
    }
]);