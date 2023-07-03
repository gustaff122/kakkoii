import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesService } from '@kakkoii/services/series.service';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { getCurrentSeason } from '@kakkoii/utils/get-season';

export const homeResolver: ResolveFn<Series[]> = (): Observable<Series[]> | Promise<Series[]> | Series[] => {
  const seriesService = inject(SeriesService);
  const paginator: Paginator = {
    limit: 10,
    page: 0,
  };
  const { season_type, season_year } = getCurrentSeason();


  return seriesService.getSeriesList(paginator, { season_year, season_type }).pipe(
    map(({ series }) => {
      return series;
    }),
  );
};