import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { SeriesService } from '@kakkoii/services/series.service';

export const episodeAvailableGuard: CanActivateFn = (_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const episodesService = inject(EpisodesService);
  const seriesService = inject(SeriesService);
  const router = inject(Router);
  const epNumber = _route.params['episode_no'];
  const seriesPseudo = _route.parent.params['seriesPseudo'];

  return seriesService.getSeriesByPseudo(seriesPseudo).pipe(
    switchMap(series => {
        return episodesService.getEpisode(series.anime_id, epNumber).pipe(
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