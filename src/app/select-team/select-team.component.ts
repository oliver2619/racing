import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AiLevel } from 'src/model/ai-level';
import { TeamIndex } from 'src/model/team';
import { AppService } from '../app.service';

@Component({
  selector: 'r-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTeamComponent {

  isChampionship: boolean = false;
  team: TeamIndex = 0;
  level: AiLevel = 0;

  constructor(private readonly appService: AppService, private readonly router: Router, activatedRoute: ActivatedRoute) {
    activatedRoute.data.subscribe({ next: it => this.isChampionship = it['championship'] });
  }

  start() {
    if (this.isChampionship) {
      this.appService.newChampionship(this.team, this.level);
    } else {
      this.appService.newSingleRace(this.team);
    }
    this.router.navigateByUrl(this.appService.defaultRoutingPath);
  }
}
