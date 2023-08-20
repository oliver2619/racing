import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Tires } from 'src/model/tires';

@Component({
  selector: 'r-car-setup',
  templateUrl: './car-setup.component.html',
  styleUrls: ['./car-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarSetupComponent {

  benchmarkValue: number = 0;
  maxRounds: number = 0;

  get avgSpeedInCurve(): number {
    return this.appService.getUserAvgSpeedInCurve();
  }

  get challengeSuccessTimes(): number {
    return this.appService.userChallengeSuccessTimes;
  }

  get durability(): number {
    return this.appService.userDurability;
  }

  set durability(d: number) {
    this.appService.userDurability = d;
    this.updateAll();
  }

  get flaps(): number {
    return this.appService.userFlaps;
  }

  set flaps(f: number) {
    this.appService.userFlaps = f;
    this.updateAll();
  }

  get fuel(): number {
    return this.appService.userFuel;
  }

  get gear(): number {
    return this.appService.userGear;
  }

  set gear(g: number) {
    this.appService.userGear = g;
    this.updateAll();
  }

  get maxAcceleration(): number {
    return this.appService.getUserMaxAcceleration();
  }

  get maxSpeed(): number {
    return this.appService.getUserMaxSpeed();
  }

  get tiresDry(): boolean {
    return this.appService.userTires === Tires.DRY;
  }

  get tiresRain(): boolean {
    return this.appService.userTires === Tires.RAIN;
  }

  constructor(private readonly appService: AppService) {
    this.updateAll();
  }

  canChangeFuel(amount: number): boolean {
    return this.appService.canSetUserFuel(this.appService.userFuel + amount);
  }

  changeFuel(amount: number) {
    this.appService.userFuel += amount;
    this.updateAll();
  }

  setTiresDry() {
    this.appService.userTires = Tires.DRY;
    this.updateAll();
  }

  setTiresRain() {
    this.appService.userTires = Tires.RAIN;
    this.updateAll();
  }

  updateMaxRounds() {
    const result = this.appService.getUserBenchmark();
    this.maxRounds = result.cruiseRange;
  }

  updateBenchmark() {
    const result = this.appService.getUserBenchmark();
    this.benchmarkValue = result.averageSpeed;
  }

  private updateAll() {
    const result = this.appService.getUserBenchmark();
    this.maxRounds = result.cruiseRange;
    this.benchmarkValue = result.averageSpeed;
  }
}
