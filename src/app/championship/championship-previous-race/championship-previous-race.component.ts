import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { RaceResultInfo } from 'src/model/race-result';
import { TEAM_CONFIGURATIONS } from 'src/model/team';

interface Element {
  position: number | undefined;
  team: string;
  score: number;
  start: number;
  fastLap: number | undefined;
  fastLapBest: boolean;
}

@Component({
  selector: 'r-championship-previous-race',
  templateUrl: './championship-previous-race.component.html',
  styleUrls: ['./championship-previous-race.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionshipPreviousRaceComponent {

  readonly rankings: Element[];

  constructor(appService: AppService) {

    if (appService.lastRaceResults !== undefined) {
      const result = appService.lastRaceResults;
      const fastestLaps: number[] = result.map(it => it.fastestLap).filter(it => it !== undefined) as number[];
      const fastestLap = fastestLaps.length > 0 ? Math.min.apply(Math, fastestLaps) : 0;
      this.rankings = result.map(it => {
        const ret: Element = {
          fastLap: it.fastestLap,
          fastLapBest: fastestLap === it.fastestLap,
          position: it.finalPosition,
          score: it.score,
          start: it.startPosition,
          team: appService.getTeamName(it.team)
        };
        return ret;
      });
    } else {
      this.rankings = [];
    }
  }
}
