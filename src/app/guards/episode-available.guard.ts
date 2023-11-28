import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { SeriesService } from '@kakkoii/services/series.service';

export const episodeAvailableGuard: CanActivateFn = (_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const seriesService = inject(SeriesService);
  const router = inject(Router);
  const epNumber = _route.params['episodeno'];
  const seriesPseudo = _route.parent.params['seriesPseudo'];

  return seriesService.getSeriesByPseudo(seriesPseudo).pipe(
    switchMap(series => {
        return seriesService.getEpisode(series.id, epNumber).pipe(
          map((ep) => {
            if (ep) {
              return true;
            } else {
              return router.parseUrl('/');
            }
          }),
          catchError(() => {
            return of(router.parseUrl(`/series/${seriesPseudo}`));
          }),
        );
      },
    ));
};