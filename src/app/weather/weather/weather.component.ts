import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Weather } from 'src/model/weather';

@Component({
  selector: 'r-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WeatherComponent implements OnDestroy {

  private timer: number | undefined;

  get canShuffle(): boolean {
    return !this.isShuffling;
  }

  get isShuffling(): boolean {
    return this.timer !== undefined;
  }

  get weather(): Weather {
    return this.appService.weather;
  }

  set weather(w: Weather) {
    this.appService.weather = w;
  }

  constructor(private readonly appService: AppService) { }

  ngOnDestroy(): void {
    if (this.timer !== undefined) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  canSetWeather(w: Weather): boolean {
    return !this.isShuffling && this.appService.canSetWeather(w);
  }

  shuffle() {
    if (this.timer === undefined) {
      let count = Math.floor(Math.random() * 20 + 1);
      this.timer = window.setInterval(() => {
        this.appService.shuffleWeather();
        if (--count <= 0) {
          window.clearInterval(this.timer);
          this.timer = undefined;
        }
      }, 100);
    }
  }
}
