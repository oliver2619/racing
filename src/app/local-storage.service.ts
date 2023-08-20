import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private static readonly PREFIX = 'racing:';

  hasKey(key: string): boolean {
    return localStorage.getItem(this.getFullKey(key)) !== null;
  }

  listKeys(prefix: string): string[] {
    const key = this.getFullKey(prefix);
    const ret: string[] = [];
    for (let i = 0; i < localStorage.length; ++i) {
      const item = localStorage.key(i);
      if (item?.startsWith(key)) {
        ret.push(item.substring(key.length));
      }
    }
    return ret;
  }

  load<T>(key: string): T | undefined {
    const data = localStorage.getItem(this.getFullKey(key));
    return data !== null ? JSON.parse(data) : undefined;
  }

  remove(key: string) {
    localStorage.removeItem(this.getFullKey(key));
  }

  save(key: string, data: any): void {
    localStorage.setItem(this.getFullKey(key), JSON.stringify(data));
  }

  private getFullKey(key: string): string {
    return `${LocalStorageService.PREFIX}${key}`;
  }
}
