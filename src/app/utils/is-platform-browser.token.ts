import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

function isPlatformBrowserFactory(platformId: object): boolean {
  return isPlatformBrowser(platformId);
}

export const IS_PLATFORM_BROWSER = new InjectionToken<boolean>('IS_PLATFORM_BROWSER', {
  providedIn: 'root',
  factory: () => isPlatformBrowserFactory(inject(PLATFORM_ID)),
});