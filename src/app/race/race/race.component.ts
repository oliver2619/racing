import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AudioService } from 'src/app/audio.service';

@Component({
  selector: 'r-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RaceComponent {

  get isHornPlayed(): boolean {
    return this.audioService.hornPlayed;
  }

  constructor(private readonly audioService: AudioService, private readonly appService: AppService) {}

  horn() {
    this.audioService.horn(this.appService.userTeam);
  }
}
