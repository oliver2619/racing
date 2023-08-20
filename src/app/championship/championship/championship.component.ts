import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'r-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionshipComponent {

  get hasRaceResult(): boolean {
    return this.appService.lastRaceResults !== undefined;
  }

  constructor(private readonly appService: AppService) { }
}
