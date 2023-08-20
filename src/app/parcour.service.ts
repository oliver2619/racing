import { Injectable } from '@angular/core';
import { ParcourJson } from 'src/model/parcour/parcour-json';
import { LocalStorageService } from './local-storage.service';

export interface SavedParcourInfo {
  readonly key: string;
  readonly name: string;
  readonly builtin: boolean;
}

const p1: ParcourJson = { "version": 1, "name": "Rennen 1", "rounds": 5, "rotation": 0, "elements": [{ "length": 3, "curve": { "speed": 15, "turn": "r" } }, { "length": 4 }, { "length": 3 }, { "length": 4, "curve": { "speed": 18, "turn": "r" } }, { "length": 3 }, { "length": 3, "curve": { "speed": 16, "turn": "r" } }, { "length": 4 }, { "length": 4 }, { "length": 1, "curve": { "speed": 12, "turn": "r" } }] };

export const BUILTIN_PARCOURS: { [key: string]: ParcourJson } = {
  p1
};

@Injectable({
  providedIn: 'root'
})
export class ParcourService {

  private static readonly PREFIX = 'parcours:';

  constructor(private readonly localStorageService: LocalStorageService) { }

  hasCustomParcour(name: string): boolean {
    return this.localStorageService.listKeys(ParcourService.PREFIX).some(it => {
      const json: ParcourJson = this.localStorageService.load(this.getFullKey(it))!;
      return json.name === name;
    });
  }

  listBuiltinParcours(): SavedParcourInfo[] {
    return Object.entries(BUILTIN_PARCOURS).map(it => {
      const ret: SavedParcourInfo = {
        builtin: true,
        key: it[0],
        name: it[1].name
      };
      return ret;
    });
  }

  listCustomParcours(): SavedParcourInfo[] {
    return this.localStorageService.listKeys(ParcourService.PREFIX).map(it => {
      const json: ParcourJson = this.localStorageService.load(this.getFullKey(it))!;
      const ret: SavedParcourInfo = {
        builtin: false,
        key: it,
        name: json.name
      };
      return ret;
    });
  }

  listParcours(): SavedParcourInfo[] {
    return [...this.listBuiltinParcours(), ...this.listCustomParcours()];
  }

  loadBuiltinParcourAsJson(key: string): ParcourJson | undefined {
    return BUILTIN_PARCOURS[key];
  }

  loadCustomParcourAsJson(key: string): ParcourJson | undefined {
    return this.localStorageService.load(this.getFullKey(key));
  }

  removeCustomParcour(key: string) {
    this.localStorageService.remove(this.getFullKey(key));
  }

  saveCustomParcourJson(parcour: ParcourJson) {
    const keys = this.localStorageService.listKeys(ParcourService.PREFIX).map(it => Number.parseInt(it));
    const next = keys.length > 0 ? Math.max.apply(Math, keys) + 1 : 0;
    this.localStorageService.save(this.getFullKey(next), parcour);
  }

  private getFullKey(key: any): string {
    return `${ParcourService.PREFIX}${key}`
  }

}
