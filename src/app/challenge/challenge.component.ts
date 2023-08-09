import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

interface ChallengeJson {
  version: 1;
  score: number;
}

@Component({
  selector: 'r-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChallengeComponent implements OnDestroy {

  private static readonly STORE_KEY = 'challenge';

  private _score = 0;
  private timer: number | undefined;

  constructor(private localStorageService: LocalStorageService) {
    const json: ChallengeJson | undefined = localStorageService.load(ChallengeComponent.STORE_KEY);
    if (json !== undefined) {
      this._score = json.score;
    }
  }

  get isAnimating(): boolean {
    return this.timer !== undefined;
  }

  get score(): number {
    return this._score;
  }

  ngOnDestroy(): void {
    if (this.timer !== undefined) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  start() {
    if (this.isAnimating) {
      return;
    }
    this.shuffle();
    const count = Math.floor(Math.random() * 20) + 1;
    let i = 0;
    this.timer = window.setInterval(() => {
      this.shuffle();
      if (++i >= count) {
        window.clearInterval(this.timer);
        this.timer = undefined;
      }
    }, 100);
  }

  private shuffle() {
    const max = 1249;
    const min = -7;
    this._score = Math.floor(Math.exp(Math.random() * Math.log(max - min + 1)) - 1 + min);
    const json: ChallengeJson = {
      version: 1,
      score: this._score
    };
    this.localStorageService.save(ChallengeComponent.STORE_KEY, json);
  }
}
