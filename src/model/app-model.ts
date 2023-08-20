import { AppRouting } from "./app-routing";
import { BenchmarkResult } from "./benchmark";
import { CurveTurn } from "./parcour/curve-turn";
import { Parcour } from "./parcour/parcour";
import { ParcourElementInfo } from "./parcour/parcour-element-info";
import { ParcourElementRotation } from "./parcour/parcour-element-rotation";
import { ParcourJson } from "./parcour/parcour-json";
import { RaceResultInfo } from "./race-result";
import { RacingDayInfo } from "./racing-day";
import { TeamIndex, TeamInfo } from "./team";
import { Tires } from "./tires";
import { Weather } from "./weather";

export interface AppModel {

    readonly canChangeCarSetup: boolean;
    readonly canChangeParcour: boolean;
    readonly canChangeWeather: boolean;
    readonly defaultAppRouting: AppRouting;
    readonly isChampionship: boolean;
    readonly isParcourComplete: boolean;
    readonly isReadyToDrive: boolean;
    readonly lastRaceResults: RaceResultInfo[] | undefined;
    readonly numberOfParcourFields: number;
    readonly numberOfParcourTiles: number;
    readonly parcourElements: ParcourElementInfo[];
    readonly parcourStartElementRotation: ParcourElementRotation;
    readonly parcourVisible: boolean;
    readonly racingDays: RacingDayInfo[];
    readonly teams: TeamInfo[];
    readonly userChallengeSuccessTimes: number;
    readonly userTeam: TeamIndex;

    parcourName: string;
    numberOfRounds: number;
    userDurability: number;
    userFlaps: number;
    userFuel: number;
    userGear: number;
    userTires: Tires;
    weather: Weather;

    appendParcourCurve(after: number, length: number, speed: number, turn: CurveTurn): void;

    appendParcourStraight(after: number, length: number): void;

    canSetUserFuel(f: number): boolean;

    canSetWeather(w: Weather): boolean;

    clearParcour(): void;

    getUserAvgSpeedInCurve(): number;

    getUserBenchmark(): BenchmarkResult;

    getUserMaxAcceleration(): number;

    getUserMaxSpeed(): number;

    loadParcourFromJson(json: ParcourJson): void;

    removeParcourElement(i: number): void;

    rotateParcourStartElement(direction: ParcourElementRotation): void;

    saveParcourAsJson(): ParcourJson;

    setParcourElement(tile: number, length: number, curveSpeed?: number): void;

    shuffleWeather(): void;
}