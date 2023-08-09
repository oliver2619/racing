import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private static readonly PREFIX = 'racing:';

  load<T>(key: string): T | undefined {
    const data = localStorage.getItem(`${LocalStorageService.PREFIX}${key}`);
    return data !== null ? JSON.parse(data) : undefined;
  }

  save(key: string, data: any): void {
    localStorage.setItem(`${LocalStorageService.PREFIX}${key}`, JSON.stringify(data));
  }

}
