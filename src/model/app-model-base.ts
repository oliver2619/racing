import { AppModel } from "./app-model";
import { AppRouting } from "./app-routing";
import { Benchmark, BenchmarkResult } from "./benchmark";
import { Car } from "./car";
import { CarJson } from "./car-json";
import { CAR_MODELS } from "./car-model";
import { CurveTurn } from "./parcour/curve-turn";
import { Parcour } from "./parcour/parcour";
import { ParcourElementInfo } from "./parcour/parcour-element-info";
import { ParcourElementRotation } from "./parcour/parcour-element-rotation";
import { ParcourJson } from "./parcour/parcour-json";
import { RaceResultInfo } from "./race-result";
import { RacingDayInfo } from "./racing-day";
import { Team, TeamIndex, TeamInfo, TEAM_CONFIGURATIONS } from "./team";
import { TeamJson } from "./team-json";
import { Tires } from "./tires";
import { Weather } from "./weather";

export abstract class AppModelBase implements AppModel {

    abstract readonly canChangeCarSetup: boolean;
    abstract readonly canChangeParcour: boolean;
    abstract readonly canChangeWeather: boolean;
    abstract readonly defaultAppRouting: AppRouting;
    abstract readonly isChampionship: boolean;
    abstract readonly isReadyToDrive: boolean;
    abstract readonly lastRaceResults: RaceResultInfo[] | undefined;
    abstract readonly parcourVisible: boolean;
    abstract readonly racingDays: RacingDayInfo[];

    get isParcourComplete(): boolean {
        return this._parcour.isComplete;
    }

    get numberOfParcourFields(): number {
        return this._parcour.fields;
    }

    get numberOfParcourTiles(): number {
        return this._parcour.numberOfElements;
    }

    get numberOfRounds(): number {
        return this._parcour.rounds;
    }

    set numberOfRounds(r: number) {
        if (this.canChangeParcour) {
            this._parcour.rounds = r;
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    get parcourElements(): ParcourElementInfo[] {
        return this._parcour.elements;
    }

    get parcourName(): string {
        return this._parcour.name;
    }

    set parcourName(n: string) {
        if (this.canChangeParcour) {
            this._parcour.name = n;
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    get parcourStartElementRotation(): ParcourElementRotation {
        return this._parcour.startElementRotation;
    }

    get teams(): TeamInfo[] {
        return this._teams.slice(0);
    }

    get userChallengeSuccessTimes(): number {
        return this.userCar.challengeSuccessTimes;
    }

    get userDurability(): number {
        return this.userCar.durability;
    }

    set userDurability(d: number) {
        if (this.canChangeCarSetup && d >= 0 && d < 3) {
            this.userCar.durability = d;
        } else {
            throw Error('Car setup cannot be changed');
        }
    }

    get userFlaps(): number {
        return this.userCar.flaps;
    }

    set userFlaps(f: number) {
        if (this.canChangeCarSetup && f >= 0 && f < 5) {
            this.userCar.flaps = f;
        } else {
            throw Error('Car setup cannot be changed');
        }
    }

    get userFuel(): number {
        return this.userCar.fuel;
    }

    set userFuel(f: number) {
        if (this.canSetUserFuel(f)) {
            this.userCar.fuel = f;
        } else {
            throw Error('Car setup cannot be changed');
        }
    }

    get userGear(): number {
        return this.userCar.gear;
    }

    set userGear(g: number) {
        if (this.canChangeCarSetup && g >= 0 && g < 5) {
            this.userCar.gear = g;
        } else {
            throw Error('Car setup cannot be changed');
        }
    }

    get userTires(): Tires {
        return this.userCar.tires;
    }

    set userTires(t: Tires) {
        if (this.canChangeCarSetup) {
            this.userCar.tires = t;
        } else {
            throw Error('Car setup cannot be changed');
        }
    }

    get weather(): Weather {
        return this._weather;
    }

    set weather(w: Weather) {
        if (this.canSetWeather(w)) {
            this._weather = w;
        } else {
            throw Error(`Weather cannot be changed to ${Weather[w]}`);
        }
    }

    private get userCar(): Car {
        return this._cars[this.userTeam];
    }

    protected constructor(readonly userTeam: TeamIndex, private readonly _cars: Car[], private readonly _teams: Team[], private _weather: Weather, private _parcour: Parcour) { }

    appendParcourCurve(after: number, length: number, speed: number, turn: CurveTurn): void {
        if (this.canChangeParcour) {
            this._parcour.appendCurve(after, length, speed, turn);
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    appendParcourStraight(after: number, length: number): void {
        if (this.canChangeParcour) {
            this._parcour.appendStraight(after, length);
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    canSetUserFuel(f: number): boolean {
        return this.canChangeCarSetup && f >= 1 && f <= this.userCar.maxFuel;
    }

    abstract canSetWeather(w: Weather): boolean;

    clearParcour() {
        if (this.canChangeParcour) {
            this._parcour.clear();
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    getUserAvgSpeedInCurve(): number {
        let s = 0;
        for (let i = 0; i < 100; ++i) {
            s += this.userCar.getMaxSpeed(10, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(11, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(12, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(14, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(15, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(16, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(18, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(19, this._weather, i / 100);
            s += this.userCar.getMaxSpeed(20, this._weather, i / 100);
        }
        return s / 900;
    }

    getUserBenchmark(): BenchmarkResult {
        return Benchmark.run(this._parcour, this._weather, this.userCar.clone());
    }

    getUserMaxAcceleration(): number {
        let a = 0;
        for (let i = 0; i < 100; ++i) {
            a += this.userCar.getMaxAcceleration(this._weather, i / 100);
        }
        return a / 100;
    }

    getUserMaxSpeed(): number {
        let s = 0;
        for (let i = 0; i < 100; ++i) {
            s += this.userCar.getMaxSpeed(undefined, this._weather, i / 100);
        }
        return s / 100;
    }

    loadParcourFromJson(json: ParcourJson): void {
        if (this.canChangeParcour) {
            this._parcour = Parcour.load(json);
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    removeParcourElement(i: number) {
        if (this.canChangeParcour) {
            this._parcour.remove(i);
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    rotateParcourStartElement(direction: ParcourElementRotation): void {
        if (this.canChangeParcour) {
            this._parcour.rotateStartElement(direction);
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    saveParcourAsJson(): ParcourJson {
        return this._parcour.save();
    }

    setParcourElement(tile: number, length: number, curveSpeed?: number) {
        if (this.canChangeParcour) {
            this._parcour.setElementLength(tile, length);
            if (curveSpeed !== undefined) {
                this._parcour.setCurveSpeed(tile, curveSpeed);
            }
        } else {
            throw new Error('Parcour cannot be changed');
        }
    }

    abstract shuffleWeather(): void;

    protected static createNewCars(): Car[] {
        return CAR_MODELS.map((_, index) => Car.newInstance(index));
    }

    protected static createNewTeams(): Team[] {
        return TEAM_CONFIGURATIONS.map((_) => Team.newInstance(1));
    }

    protected static loadCars(cars: CarJson[]): Car[] {
        return cars.map((it, index) => Car.load(index, it));
    }

    protected static loadTeams(teams: TeamJson[]): Team[] {
        return teams.map(it => Team.load(it));
    }

    protected saveCars(): CarJson[] {
        return this._cars.map(it => it.save());
    }

    protected saveTeams(): TeamJson[] {
        return this._teams.map(it => it.save());
    }
}