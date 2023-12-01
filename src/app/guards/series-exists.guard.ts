import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SeriesService } from '@kakkoii/services/series.service';

export const seriesExistsGuard: CanActivateFn = (_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree   => {
    const seriesService = inject(SeriesService);
    const router = inject(Router);
    const seriesPseudo = _route.params['seriesPseudo'];

    return seriesService.getSeriesByPseudo(seriesPseudo).pipe(
      map((series) => {
        if (series) {
          return true;
        } else {
          return router.parseUrl('/');
        }
      })
    );
};