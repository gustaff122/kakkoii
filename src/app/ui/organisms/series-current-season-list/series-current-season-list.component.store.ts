import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesService } from '@kakkoii/services/series.service';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { getCurrentSeason } from '@kakkoii/utils/get-season';

interface SeriesCurrentSeasonListComponentState extends DefaultComponentState {
  series: Series[],
}

@Injectable()
export class SeriesCurrentSeasonListComponentStore extends DefaultComponentStore<SeriesCurrentSeasonListComponentState> {

  public readonly series$: Observable<Series[]> = this.select((state) => state.series);
  public readonly hasSeries$: Observable<boolean> = this.select((state) => state.series.length > 0);

  public readonly getSeries = this.effect((origin$: Observable<void>) => {
    const { season_type, season_year } = getCurrentSeason();
    const paginator: Paginator = {
      page: 0,
      limit: 12,
    };

    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(() => {
        return this.seriesService.getSeriesList(paginator, { season_year, season_type })
          .pipe(
            tapResponse(({ series }) => {
              this.patchState({
                series,
                loading: false,
              });
            }, ({ error }: HttpErrorResponse) => {
              this.patchState({
                loading: false,
                error,
              });
            }),
          );
      }),
    );
  });

  constructor(
    private readonly seriesService: SeriesService,
  ) {
    super({
      series: [],
      loading: false,
      error: null,
    });
  }
}