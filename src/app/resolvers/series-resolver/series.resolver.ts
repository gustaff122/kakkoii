import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesService } from '@kakkoii/services/series.service';

export const seriesResolver: ResolveFn<Series> = (route: ActivatedRouteSnapshot): Observable<Series> | Promise<Series> | Series => {
  const seriesService = inject(SeriesService);
  const seriesPseudo = route.params['seriesPseudo']

  return seriesService.getSeriesByPseudo(seriesPseudo).pipe(
    map((series) => {
      return series
    })
  );
};