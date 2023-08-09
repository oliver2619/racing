import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

interface SettingsJson {
  version: 1;
  audioLevel: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private static readonly STORE_KEY = 'settings';

  private _name: string = 'Du';
  private _audioLevel: number = 1;

  get name(): string {
    return this._name;
  }

  set name(n: string) {
    this._name = n;
    this.save();
  }

  get audioLevel(): number {
    return this._audioLevel;
  }

  set audioLevel(l: number) {
    this._audioLevel = l;
    this.save();
  }

  constructor(private readonly localStorageService: LocalStorageService) {
    const json: SettingsJson | undefined = this.localStorageService.load(SettingsService.STORE_KEY);
    if (json !== undefined) {
      this._name = json.name;
      this._audioLevel = json.audioLevel;
    }
  }

  private save() {
    const json: SettingsJson = {
      version: 1,
      name: this._name,
      audioLevel: this._audioLevel
    };
    this.localStorageService.save(SettingsService.STORE_KEY, json);
  }
}
