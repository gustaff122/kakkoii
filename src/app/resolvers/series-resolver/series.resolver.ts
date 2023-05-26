import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesService } from '@kakkoii/services/series.service';
import { IS_PLATFORM_BROWSER } from '@kakkoii/utils/is-platform-browser.token';

export const seriesResolver: ResolveFn<Series> = (route: ActivatedRouteSnapshot): Observable<Series> | Promise<Series> | Series => {
  const seriesService = inject(SeriesService);
  const seriesPseudo = route.params['seriesPseudo']
  const isBrowser = inject(IS_PLATFORM_BROWSER);
  const router = inject(Router);

  if (isBrowser && !window.navigator.onLine) {
    router.navigateByUrl('/offline');
  }

  return seriesService.getSeriesByPseudo(seriesPseudo).pipe(
    map((series) => {
      return series
    })
  );
};