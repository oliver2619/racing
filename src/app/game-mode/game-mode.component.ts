import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'r-game-mode',
  templateUrl: './game-mode.component.html',
  styleUrls: ['./game-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameModeComponent {

  get canResumeChampionship(): boolean {
    return this.appService.canLoadChampionship;
  }

  get canResumeSingleRace(): boolean {
    return this.appService.canLoadSingleRace;
  }

  constructor(private readonly appService: AppService, private readonly router: Router) { }

  resumeChampionship() {
    this.appService.loadChampionship();
    this.router.navigateByUrl(this.appService.defaultRoutingPath);
  }

  resumeSingleRace() {
    this.appService.loadSingleRace();
    this.router.navigateByUrl(this.appService.defaultRoutingPath);
  }
}
