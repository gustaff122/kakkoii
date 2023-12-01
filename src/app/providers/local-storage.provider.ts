import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageProvider {

  public setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  public getItem(key: string): string | undefined | null {
    const value = window.localStorage.getItem(key);

    if (value === 'undefined') {
      return undefined;
    }

    if (value === 'null') {
      return null;
    }

    return value;
  }

  public removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  public clear(): void {
    window.localStorage.clear();
  }

  public hasItem(key: string): boolean {
    return !!window.localStorage.getItem(key);
  }
}