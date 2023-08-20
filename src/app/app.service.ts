import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AiLevel } from 'src/model/ai-level';
import { AppModel } from 'src/model/app-model';
import { AppRouting } from 'src/model/app-routing';
import { BenchmarkResult } from 'src/model/benchmark';
import { AppModelChampionship } from 'src/model/championship/app-model-championship';
import { AppModelChampionshipJson } from 'src/model/championship/app-model-championship-json';
import { CurveTurn } from 'src/model/parcour/curve-turn';
import { ParcourElementInfo } from 'src/model/parcour/parcour-element-info';
import { ParcourElementRotation } from 'src/model/parcour/parcour-element-rotation';
import { ParcourJson } from 'src/model/parcour/parcour-json';
import { RaceResultInfo } from 'src/model/race-result';
import { RacingDayInfo } from 'src/model/racing-day';
import { AppModelSingleRace } from 'src/model/single-race.ts/app-model-single-race';
import { AppModelSingleRaceJson } from 'src/model/single-race.ts/app-model-single-race-json';
import { TeamIndex, TeamInfo, TEAM_CONFIGURATIONS } from 'src/model/team';
import { Tires } from 'src/model/tires';
import { Weather } from 'src/model/weather';
import { AppServiceJson } from './app-service-json';
import { LocalStorageService } from './local-storage.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AppService implements AppModel {

  private static readonly PREFIX_CHAMPIONSHIP = 'championship';
  private static readonly PREFIX_SINGLE_RACE = 'singleRace';
  private static readonly PREFIX_MODE = 'mode';

  readonly onChangeParcour = new Subject<void>();

  private model: AppModel | undefined;

  get canChangeCarSetup(): boolean {
    return this.model !== undefined ? this.model.canChangeCarSetup : false;
  }

  get canChangeParcour(): boolean {
    return this.model !== undefined ? this.model.canChangeParcour : false;
  }

  get canChangeWeather(): boolean {
    return this.model === undefined ? false : this.model.canChangeWeather;
  }

  get canLoadChampionship(): boolean {
    return this.localStorageService.hasKey(AppService.PREFIX_CHAMPIONSHIP);
  }

  get canLoadSingleRace(): boolean {
    return this.localStorageService.hasKey(AppService.PREFIX_SINGLE_RACE);
  }

  get defaultAppRouting(): AppRouting {
    return this.model !== undefined ? this.model.defaultAppRouting : AppRouting.INITIAL;
  }

  get defaultRoutingArray(): string[] {
    switch (this.defaultAppRouting) {
      case AppRouting.CAR_SETUP:
        return ['setup'];
      case AppRouting.CHAMPIONSHIP:
        return ['championship'];
      case AppRouting.INITIAL:
        return [''];
      case AppRouting.PARCOUR:
        return ['parcour'];
      case AppRouting.RACING:
        return ['race'];
      default:
        throw new Error(`Unhandled routing ${AppRouting[this.defaultAppRouting]}`);
    }
  }

  get defaultRoutingPath(): string {
    return this.defaultRoutingArray.map(it => `/${it}`).join();
  }

  get isChampionship(): boolean {
    return this.model !== undefined ? this.model.isChampionship : false;
  }

  get isParcourComplete(): boolean {
    return this.model !== undefined ? this.model.isParcourComplete : false;
  }

  get isReadyToDrive(): boolean {
    return this.model !== undefined ? this.model.isReadyToDrive : false;
  }

  get isSingleRace(): boolean {
    return this.model !== undefined ? !this.model.isChampionship : false;
  }

  get lastModeWasChampionship(): boolean {
    const json: AppServiceJson | undefined = this.localStorageService.load(AppService.PREFIX_MODE);
    return json !== undefined && json.mode === 'championship';
  }

  get lastModeWasSingleRace(): boolean {
    const json: AppServiceJson | undefined = this.localStorageService.load(AppService.PREFIX_MODE);
    return json !== undefined && json.mode === 'singleRace';
  }

  get lastRaceResults(): RaceResultInfo[] | undefined {
    return this.model !== undefined ? this.model.lastRaceResults : undefined;
  }

  get numberOfParcourFields(): number {
    return this.model !== undefined ? this.model.numberOfParcourFields : 0;
  }

  get numberOfParcourTiles(): number {
    return this.model !== undefined ? this.model.numberOfParcourTiles : 0;
  }

  get numberOfRounds(): number {
    return this.model !== undefined ? this.model.numberOfRounds : 0;
  }

  set numberOfRounds(r: number) {
    if (this.model !== undefined) {
      this.model.numberOfRounds = r;
      this.save();
      this.onChangeParcour.next();
    }
  }

  get parcourElements(): ParcourElementInfo[] {
    return this.model !== undefined ? this.model.parcourElements : [];
  }

  get parcourName(): string {
    return this.model !== undefined ? this.model.parcourName : '';
  }

  set parcourName(n: string) {
    if (this.model !== undefined) {
      this.model.parcourName = n;
      this.save();
    }
  }

  get parcourStartElementRotation(): ParcourElementRotation {
    return this.model !== undefined ? this.model.parcourStartElementRotation : ParcourElementRotation.UP;
  }

  get parcourVisible(): boolean {
    return this.model !== undefined ? this.model.parcourVisible : false;
  }

  get racingDays(): RacingDayInfo[] {
    return this.model !== undefined ? this.model.racingDays : [];
  }

  get teams(): TeamInfo[] {
    return this.model !== undefined ? this.model.teams : [];
  }

  get userChallengeSuccessTimes(): number {
    return this.model !== undefined ? this.model.userChallengeSuccessTimes : 0;
  }

  get userDurability(): number {
    return this.model !== undefined ? this.model.userDurability : 0;
  }

  set userDurability(d: number) {
    if (this.model !== undefined) {
      this.model.userDurability = d;
      this.save();
    }
  }

  get userFlaps(): number {
    return this.model !== undefined ? this.model.userFlaps : 0;
  }

  set userFlaps(f: number) {
    if (this.model !== undefined) {
      this.model.userFlaps = f;
      this.save();
    }
  }

  get userFuel(): number {
    return this.model !== undefined ? this.model.userFuel : 0;
  }

  set userFuel(f: number) {
    if (this.model !== undefined) {
      this.model.userFuel = f;
      this.save();
    }
  }

  get userGear(): number {
    return this.model !== undefined ? this.model.userGear : 0;
  }

  set userGear(g: number) {
    if (this.model !== undefined) {
      this.model.userGear = g;
      this.save();
    }
  }

  get userTeam(): TeamIndex {
    return this.model !== undefined ? this.model.userTeam : TeamIndex.RENAULT;
  }

  get userTires(): Tires {
    return this.model !== undefined ? this.model.userTires : Tires.DRY;
  }

  set userTires(t: Tires) {
    if (this.model !== undefined) {
      this.model.userTires = t;
      this.save();
    }
  }

  get weather(): Weather {
    return this.model !== undefined ? this.model.weather : Weather.CLOUDY;
  }

  set weather(w: Weather) {
    if (this.model !== undefined) {
      this.model.weather = w;
      this.save();
    }
  }

  constructor(private readonly settingsService: SettingsService, private readonly localStorageService: LocalStorageService) { }

  appendParcourCurve(after: number, length: number, speed: number, turn: CurveTurn): void {
    if (this.model !== undefined) {
      this.model.appendParcourCurve(after, length, speed, turn);
      this.save();
      this.onChangeParcour.next();
    }
  }

  appendParcourStraight(after: number, length: number): void {
    if (this.model !== undefined) {
      this.model.appendParcourStraight(after, length);
      this.save();
      this.onChangeParcour.next();
    }
  }

  canSetUserFuel(f: number): boolean {
    return this.model !== undefined ? this.model.canSetUserFuel(f) : false;
  }

  canSetWeather(w: Weather): boolean {
    return this.model !== undefined ? this.model.canSetWeather(w) : false;
  }

  clearParcour() {
    if (this.model !== undefined) {
      this.model.clearParcour();
      this.save();
      this.onChangeParcour.next();
    }
  }

  exitGameMode() {
    if (this.model !== undefined) {
      this.model = undefined;
      this.save();
    }
  }

  getTeamName(team: TeamIndex): string {
    return this.model === undefined || team !== this.model.userTeam ? TEAM_CONFIGURATIONS[team].name : `${TEAM_CONFIGURATIONS[team].name} (${this.settingsService.name})`;
  }

  getUserAvgSpeedInCurve(): number {
    return this.model !== undefined ? this.model.getUserAvgSpeedInCurve() : 0;
  }

  getUserBenchmark(): BenchmarkResult {
    return this.model !== undefined ? this.model.getUserBenchmark() : { averageSpeed: 0, cruiseRange: 0 };
  }

  getUserMaxAcceleration(): number {
    return this.model !== undefined ? this.model.getUserMaxAcceleration() : 0;
  }

  getUserMaxSpeed(): number {
    return this.model !== undefined ? this.model.getUserMaxSpeed() : 0;
  }

  loadChampionship() {
    const jc: AppModelChampionshipJson | undefined = this.localStorageService.load(AppService.PREFIX_CHAMPIONSHIP);
    if (jc !== undefined) {
      this.model = AppModelChampionship.load(jc);
      this.saveMode();
    }
  }

  loadSingleRace() {
    const js: AppModelSingleRaceJson | undefined = this.localStorageService.load(AppService.PREFIX_SINGLE_RACE);
    if (js !== undefined) {
      this.model = AppModelSingleRace.load(js);
      this.saveMode();
    }
  }

  loadParcourFromJson(json: ParcourJson) {
    if (this.model !== undefined) {
      this.model.loadParcourFromJson(json);
      this.save();
    }
  }

  newChampionship(team: TeamIndex, aiLevel: AiLevel) {
    this.model = AppModelChampionship.newInstance(team, aiLevel);
    this.save();
  }

  newSingleRace(team: TeamIndex) {
    this.model = AppModelSingleRace.newInstance(team);
    this.save();
  }

  removeParcourElement(i: number) {
    if (this.model !== undefined) {
      this.model.removeParcourElement(i);
      this.save();
      this.onChangeParcour.next();
    }
  }

  rotateParcourStartElement(amount: ParcourElementRotation): void {
    if (this.model !== undefined) {
      this.model.rotateParcourStartElement(amount);
      this.save();
      this.onChangeParcour.next();
    }
  }

  saveParcourAsJson(): ParcourJson {
    if (this.model !== undefined) {
      return this.model.saveParcourAsJson();
    } else {
      throw new Error('Unable to save parcour');
    }
  }

  setParcourElement(tile: number, length: number, curveSpeed?: number) {
    if (this.model !== undefined) {
      this.model.setParcourElement(tile, length, curveSpeed);
      this.save();
      this.onChangeParcour.next();
    }
  }

  shuffleWeather() {
    if (this.model !== undefined) {
      this.model.shuffleWeather();
      this.save();
    }
  }

  private save() {
    if (this.model !== undefined) {
      if (this.model.isChampionship) {
        const json = (this.model as AppModelChampionship).saveAsJson();
        this.localStorageService.save(AppService.PREFIX_CHAMPIONSHIP, json);
      } else {
        const json = (this.model as AppModelSingleRace).saveAsJson();
        this.localStorageService.save(AppService.PREFIX_SINGLE_RACE, json);
      }
    }
    this.saveMode();
  }

  private saveMode() {
    const json: AppServiceJson = {
      version: 1,
      mode: this.model !== undefined ? (this.model.isChampionship ? 'championship' : 'singleRace') : undefined
    }
    this.localStorageService.save(AppService.PREFIX_MODE, json);
  }
}
