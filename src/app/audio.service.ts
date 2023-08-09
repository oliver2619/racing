import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

class Element {

  private readonly audioElement: HTMLAudioElement;
  private playing = false;

  constructor(name: string, private readonly multiple: boolean) {
    this.audioElement = new Audio(`assets/sounds/${name}.mp3`);
    this.audioElement.addEventListener('ended', _ => this.playing = false);
  }

  play() {
    if (this.playing) {
      if (this.multiple) {
        this.audioElement.currentTime = 0;
      }
    } else {
      this.audioElement.play();
      this.playing = true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private _click = new Element('click', true);

  constructor(private readonly settingsService: SettingsService) { }

  click() {
    if (this.settingsService.audioLevel > 1) {
      this._click.play();
    }
  }
}
