import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

interface Element {
  position: number;
  name: string;
  score: number;
  polePositions: number;
  polePositionsBest: boolean;
  fastestLaps: number;
  fastestLapsBest: boolean;
}

@Component({
  selector: 'r-championship-ranking',
  templateUrl: './championship-ranking.component.html',
  styleUrls: ['./championship-ranking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionshipRankingComponent {

  readonly rankings: Element[];

  constructor(appService: AppService) {
    const teams = appService.teams;
    const fastestLap = Math.max.apply(Math, teams.map(it => it.fastestLaps));
    const maxPolePositions = Math.max.apply(Math, teams.map(it => it.polePositions));
    this.rankings = appService.teams.map((it, index) => {
      const ret: Element = {
        fastestLaps: it.fastestLaps,
        fastestLapsBest: it.fastestLaps === fastestLap,
        polePositions: it.polePositions,
        polePositionsBest: it.polePositions === maxPolePositions,
        position: it.championshipRanking,
        score: it.score,
        name: appService.getTeamName(index)
      };
      return ret;
    });
    this.rankings.sort((r1, r2) => r1.position - r2.position);
  }
}
