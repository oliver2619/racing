import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'r-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WeatherComponent implements OnDestroy {

  private timer: number | undefined;
  private _w = 0;

  get canShuffle(): boolean {
    return !this.isShuffling;
  }

  get isShuffling(): boolean {
    return this.timer !== undefined;
  }

  get weather(): number {
    return this._w;
  }

  set weather(w: number) {
    this._w = w;
  }

  ngOnDestroy(): void {
    if (this.timer !== undefined) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  canSetWeather(w: number): boolean {
    return !this.isShuffling;
  }

  shuffle() {
    if (this.timer === undefined) {
      let count = Math.floor(Math.random() * 20 + 1);
      this.timer = window.setInterval(() => { 
        this.weather = Math.floor(Math.random() * 5);
        if(--count <= 0) {
          window.clearInterval(this.timer);
          this.timer = undefined;
        }
      }, 100);
    }
  }
}
