import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'r-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NavBarComponent {

  @Input('back')
  backEnabled: boolean = false;

  get canChangeWeather(): boolean {
    return this.appService.canChangeWeather;
  }

  get canNavigateChampionship(): boolean {
    return this.appService.isChampionship;
  }

  get canNavigateParcour(): boolean {
    return this.appService.parcourVisible;
  }

  get canRace(): boolean {
    return this.appService.isReadyToDrive;
  }

  get canSetupCar(): boolean {
    return this.appService.canChangeCarSetup;
  }

  constructor(private readonly router: Router, private readonly appService: AppService) { }

  back() {
    this.appService.exitGameMode();
    this.router.navigateByUrl(this.appService.defaultRoutingPath);
  }
}
