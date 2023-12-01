import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { SeriesService } from '@kakkoii/services/series.service';
import { IS_PLATFORM_BROWSER } from '@kakkoii/utils/is-platform-browser.token';
import { SeriesPlayer } from '@kakkoii/interfaces/series-player';

export const episodeResolver: ResolveFn<{ episode: SeriesEpisode, players: SeriesPlayer[] }> = (route: ActivatedRouteSnapshot): Observable<{ episode: SeriesEpisode, players: SeriesPlayer[] }> | Promise<{
  episode: SeriesEpisode,
  players: SeriesPlayer[]
}> | {
  episode: SeriesEpisode,
  players: SeriesPlayer[]
} => {
  const seriesService = inject(SeriesService);
  const seriesPseudo = route.params['seriesPseudo'];
  const episodeno = route.params['episodeno'];
  const isBrowser = inject(IS_PLATFORM_BROWSER);
  const router = inject(Router);

  if (isBrowser && !window.navigator.onLine) {
    router.navigateByUrl('/offline');
  }

  seriesService.getSeriesByPseudo(seriesPseudo).pipe(
    map(({ id }) => {
      return seriesService.getEpisode(id, episodeno).pipe(
        map((episode) => {
          return episode;
        }),
      );
    }),
  );

  return { episode: null, players: [] };
};