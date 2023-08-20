import { AppModelBase } from "../app-model-base";
import { AppRouting } from "../app-routing";
import { Car } from "../car";
import { Parcour } from "../parcour/parcour";
import { RaceResultInfo } from "../race-result";
import { RacingDayInfo } from "../racing-day";
import { Team, TeamIndex } from "../team";
import { Weather } from "../weather";
import { AppModelSingleRaceJson } from "./app-model-single-race-json";

enum SingleRaceState {
    QUALIFYING_PREPARE, QUALIFYING_SET_POSITION, QUALIFYING_DRIVING, QUALIFYING_FINISHED, RACING_PREPARE, RACING_DRIVING, FINISHED
}

export class AppModelSingleRace extends AppModelBase {

    readonly isChampionship = false;
    readonly racingDays: RacingDayInfo[] = [];
    readonly lastRaceResults: RaceResultInfo[] | undefined = undefined;

    get canChangeCarSetup(): boolean {
        switch (this.state) {
            case SingleRaceState.QUALIFYING_PREPARE:
            case SingleRaceState.RACING_PREPARE:
                return this.isParcourComplete;
            default:
                return false;
        }
    }

    get canChangeParcour(): boolean {
        switch (this.state) {
            case SingleRaceState.QUALIFYING_PREPARE:
                return true;
            default:
                return false;
        }
    }

    get canChangeWeather(): boolean {
        return this.isParcourComplete;
    }

    get defaultAppRouting(): AppRouting {
        switch (this.state) {
            case SingleRaceState.QUALIFYING_PREPARE:
                return AppRouting.PARCOUR;
            default:
                return AppRouting.RACING;
        }
    }

    get isReadyToDrive(): boolean {
        return this.isParcourComplete;
    }

    get parcourVisible(): boolean {
        switch (this.state) {
            case SingleRaceState.QUALIFYING_PREPARE:
            case SingleRaceState.RACING_PREPARE:
                return true;
            default:
                return false;
        }
    }

    private constructor(userTeam: TeamIndex, cars: Car[], teams: Team[], weather: Weather, parcour: Parcour,  private state: SingleRaceState) {
        super(userTeam, cars, teams, weather, parcour);
    }

    static load(json: AppModelSingleRaceJson): AppModelSingleRace {
        return new AppModelSingleRace((TeamIndex as any)[json.userTeam] as TeamIndex, AppModelBase.loadCars(json.cars), AppModelBase.loadTeams(json.teams), (Weather as any)[json.weather] as Weather, Parcour.load(json.parcour), (SingleRaceState as any)[json.state] as SingleRaceState);
    }

    static newInstance(userTeam: TeamIndex): AppModelSingleRace {
        return new AppModelSingleRace(userTeam, AppModelBase.createNewCars(), AppModelBase.createNewTeams(), Weather.CLOUDY, Parcour.newInstance(), SingleRaceState.QUALIFYING_PREPARE);
    }

    canSetWeather(w: Weather): boolean {
        switch (this.state) {
            case SingleRaceState.QUALIFYING_PREPARE:
            case SingleRaceState.RACING_PREPARE:
                return w >= 0 && w < 5;
            case SingleRaceState.QUALIFYING_SET_POSITION:
            case SingleRaceState.QUALIFYING_DRIVING:
            case SingleRaceState.QUALIFYING_FINISHED:
            case SingleRaceState.FINISHED:
                return false;
            case SingleRaceState.RACING_DRIVING:
                return w >= 0 && w < 5 && Math.abs(w - this.weather) < 2;
            default:
                throw Error(`Unhandled state ${SingleRaceState[this.state]}`);
        }
    }

    saveAsJson(): AppModelSingleRaceJson {
        const ret: AppModelSingleRaceJson = {
            version: 1,
            cars: this.saveCars(),
            state: SingleRaceState[this.state],
            teams: this.saveTeams(),
            userTeam: TeamIndex[this.userTeam],
            weather: Weather[this.weather],
            parcour: this.saveParcourAsJson()
        };
        return ret;
    }

    shuffleWeather() {
        switch (this.state) {
            case SingleRaceState.QUALIFYING_PREPARE:
            case SingleRaceState.RACING_PREPARE:
                this.weather = Math.floor(Math.random() * 5);
                break;
            case SingleRaceState.RACING_DRIVING:
                const min = Math.max(0, this.weather - 1);
                const max = Math.min(4, this.weather + 1);
                this.weather = Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
}