import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { BUILTIN_PARCOURS } from 'src/app/parcour.service';
import { RacingDayInfo } from 'src/model/racing-day';
import { TEAM_CONFIGURATIONS } from 'src/model/team';

interface Element {
  parcour: string;
  winner: string;
  pole: string;
}

@Component({
  selector: 'r-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {

  readonly racingDays: Element[];

  constructor(private readonly appService: AppService) {
    this.racingDays = appService.racingDays.map(it => this.map(it));
  }

  private map(it: RacingDayInfo): Element {
    let winner = '';
    let pole = '';
    if (it.results !== undefined) {
      winner = this.appService.getTeamName(it.results[0].team);
      const foundPole = it.results.find(it => it.startPosition === 1);
      if (foundPole !== undefined) {
        pole = this.appService.getTeamName(foundPole.team);
      }
    }
    const ret: Element = {
      parcour: BUILTIN_PARCOURS[it.parcour].name,
      winner,
      pole
    };
    return ret;
  }
}
