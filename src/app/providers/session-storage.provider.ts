import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageProvider {

  public setItem(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }

  public getItem(key: string): string | undefined | null {
    const value = window.sessionStorage.getItem(key);

    if (value === 'undefined') {
      return undefined;
    }

    if (value === 'null') {
      return null;
    }

    return value;
  }

  public removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  public clear(): void {
    window.sessionStorage.clear();
  }

  public hasItem(key: string): boolean {
    return !!window.sessionStorage.getItem(key);
  }
}