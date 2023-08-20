import { BUILTIN_PARCOURS } from "src/app/parcour.service";
import { AiLevel } from "../ai-level";
import { AppModelBase } from "../app-model-base";
import { AppRouting } from "../app-routing";
import { Car } from "../car";
import { Parcour } from "../parcour/parcour";
import { RaceResultInfo } from "../race-result";
import { RacingDay, RacingDayInfo } from "../racing-day";
import { RacingDayJson } from "../racing-day-json";
import { Team, TeamIndex } from "../team";
import { Weather } from "../weather";
import { AppModelChampionshipJson } from "./app-model-championship-json";

enum ChampionshipState {
    QUALIFYING_PREPARE, QUALIFYING_SET_POSITION, QUALIFYING_DRIVING, QUALIFYING_FINISHED, RACING_PREPARE, RACING_DRIVING, RACING_FINISHED, CHAMPIONSHIP_FINISHED
}

export class AppModelChampionship extends AppModelBase {

    static readonly SCORES: ReadonlyArray<number> = Object.freeze([15, 10, 6, 3, 1, 0]);

    readonly canChangeParcour = false;
    readonly canChangeWeather = false;
    readonly isChampionship = true;

    get canChangeCarSetup(): boolean {
        switch (this.state) {
            case ChampionshipState.QUALIFYING_PREPARE:
            case ChampionshipState.RACING_PREPARE:
                return true;
            default:
                return false;
        }
    }

    get defaultAppRouting(): AppRouting {
        switch (this.state) {
            case ChampionshipState.QUALIFYING_PREPARE:
            case ChampionshipState.RACING_PREPARE:
                return AppRouting.PARCOUR;
            case ChampionshipState.CHAMPIONSHIP_FINISHED:
                return AppRouting.CHAMPIONSHIP;
            default:
                return AppRouting.RACING;
        }
    }

    get isReadyToDrive(): boolean {
        switch (this.state) {
            case ChampionshipState.CHAMPIONSHIP_FINISHED:
                return false;
            default:
                return true;
        }
    }

    get lastRaceResults(): RaceResultInfo[] | undefined {
        const results = this._racingDays.filter(it => it.results !== undefined).map(it => it.results) as RaceResultInfo[][];
        if (results.length > 0) {
            return results[results.length - 1].slice(0);
        } else {
            return undefined;
        }
    }

    get parcourVisible(): boolean {
        switch (this.state) {
            case ChampionshipState.QUALIFYING_PREPARE:
            case ChampionshipState.RACING_PREPARE:
                return true;
            default:
                return false;
        }
    }

    get racingDays(): RacingDayInfo[] {
        return this._racingDays.map(it => it.clone());
    }

    private constructor(userTeam: TeamIndex, private readonly aiLevel: AiLevel, cars: Car[], teams: Team[], weather: Weather, private readonly _racingDays: RacingDay[], parcour: Parcour, private state: ChampionshipState) {
        super(userTeam, cars, teams, weather, parcour);
    }

    static load(json: AppModelChampionshipJson): AppModelChampionship {
        const racingDays = AppModelChampionship.loadRacingDays(json.racingDays);
        // FIXME create parcour from racing day
        const parcour = Parcour.newInstance();
        return new AppModelChampionship((TeamIndex as any)[json.userTeam] as TeamIndex, (AiLevel as any)[json.aiLevel] as AiLevel, AppModelBase.loadCars(json.cars), AppModelBase.loadTeams(json.teams), (Weather as any)[json.weather] as Weather, racingDays, parcour, (ChampionshipState as any)[json.state] as ChampionshipState);
    }

    static newInstance(userTeam: TeamIndex, aiLevel: AiLevel): AppModelChampionship {
        const racingDays: RacingDay[] = Object.keys(BUILTIN_PARCOURS).map(it => RacingDay.newInstance(it));
        const parcour = Parcour.load(BUILTIN_PARCOURS[racingDays[0].parcour]);
        const weather: Weather = Math.floor(Math.random() * 5);
        return new AppModelChampionship(userTeam, aiLevel, AppModelBase.createNewCars(), AppModelBase.createNewTeams(), weather, racingDays, parcour, ChampionshipState.QUALIFYING_PREPARE);
    }

    canSetWeather(w: Weather): boolean {
        return false;
    }

    saveAsJson(): AppModelChampionshipJson {
        const ret: AppModelChampionshipJson = {
            version: 1,
            state: ChampionshipState[this.state],
            aiLevel: AiLevel[this.aiLevel],
            cars: this.saveCars(),
            teams: this.saveTeams(),
            userTeam: TeamIndex[this.userTeam],
            weather: Weather[this.weather],
            racingDays: this.saveRacingDays()
        };
        return ret;
    }

    shuffleWeather() {
        throw Error('Weather cannot be changed in championship mode');
    }

    private static loadRacingDays(days: RacingDayJson[]): RacingDay[] {
        return days.map(it => RacingDay.load(it));
    }

    private saveRacingDays(): RacingDayJson[] {
        return this._racingDays.map(it => it.save());
    }
}