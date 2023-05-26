import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { EpisodesService } from '@kakkoii/services/episodes.service';

export const episodeAvailableGuard: CanActivateFn = (_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree   => {
  const episodesService = inject(EpisodesService);
  const router = inject(Router);
  const epNumber = _route.params['epNumber'];
  const seriesPseudo = _route.params['seriesPseudo'];

  return episodesService.getEpisode(seriesPseudo, epNumber).pipe(
      map((ep) => {
        if (ep) {
          return true;
        } else {
          return router.parseUrl('/');
        }
      }),
    catchError(() => {
      return of(router.parseUrl(`/series/${seriesPseudo}`));
    })
  );
};