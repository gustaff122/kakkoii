import { RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';

export class KakkoiiRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(): boolean {
    return false;
  }

  store(): void {}

  shouldAttach(): boolean {
    return false;
  }

  retrieve(): DetachedRouteHandle | null {
    return null;
  }

  shouldReuseRoute(): boolean {
    return false;
  }
}
