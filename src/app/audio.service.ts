import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';

class Element {

  private readonly audioElement: HTMLAudioElement;
  private _playing = false;

  get playing(): boolean {
    return this._playing;
  }

  constructor(name: string, private readonly multiple: boolean) {
    this.audioElement = new Audio(`assets/sounds/${name}.mp3`);
    this.audioElement.addEventListener('ended', _ => this._playing = false);
  }

  play() {
    if (this._playing) {
      if (this.multiple) {
        this.audioElement.currentTime = 0;
      }
    } else {
      this.audioElement.play();
      this._playing = true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private _click = new Element('click', true);
  private _horn: Element[] = [
    new Element('horn1', false),
    new Element('horn2', false),
    new Element('horn3', false),
    new Element('horn4', false),
    new Element('horn5', false),
    new Element('horn6', false),
  ];
  private currentHorn: Element | undefined;

  get hornPlayed(): boolean {
    return this.currentHorn !== undefined && this.currentHorn.playing;
  }

  constructor(private readonly settingsService: SettingsService) { }

  click() {
    if (this.settingsService.audioLevel > 1) {
      this._click.play();
    }
  }

  horn(team: number) {
    if(this.settingsService.audioLevel > 0 && !this.hornPlayed) {
      this.currentHorn = this._horn[team];
      this.currentHorn.play();
    }
  }
}
