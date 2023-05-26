import { Injectable } from '@angular/core';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { Series } from '@kakkoii/interfaces/series';
import { exhaustMap, Observable, tap } from 'rxjs';
import { SeriesListFilters } from '@kakkoii/interfaces/series-list-filters';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { tapResponse } from '@ngrx/component-store';
import { HttpErrorResponse } from '@angular/common/http';
import { SeriesService } from '@kakkoii/services/series.service';

interface SeriesBrowserComponentState extends DefaultComponentState {
  series: Series[],
  filters: Partial<SeriesListFilters> | null;
  totalCount: number | null,
  page: number,
}

@Injectable()
export class SeriesBrowserComponentStore extends DefaultComponentStore<SeriesBrowserComponentState> {

  public readonly series$: Observable<Series[]> = this.select((state) => state.series);
  public readonly totalCount$: Observable<number | null> = this.select((state) => state.totalCount);
  public readonly filters$: Observable<Partial<SeriesListFilters> | null> = this.select((state) => state.filters);

  public readonly getSeries = this.effect((origin$: Observable<{ filters: Partial<SeriesListFilters> }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ filters }) => {
        const paginator: Paginator = {
          limit: 12,
          page: 0,
        };

        return this.seriesService.getSeriesList(paginator, filters).pipe(
          tapResponse(({ series, totalCount }) => {
            this.patchState({
              series,
              filters,
              totalCount,
              page: 1,
              loading: false,
              error: null,
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

  public readonly getNextPage = this.effect((origin$: Observable<void>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(() => {
        const paginator: Paginator = {
          limit: 12,
          page: this.get().page,
        };

        const filters: Partial<SeriesListFilters> = this.get().filters;

        return this.seriesService.getSeriesList(paginator, filters).pipe(
          tapResponse(({ series, totalCount }) => {
            this.patchState((state) =>{
              return {
                ...state,
                series: [...state.series, ...series],
                totalCount,
                page: state.page + 1,
                loading: false,
              }
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
    private readonly seriesService: SeriesService
  ) {
    super({
      series: [],
      filters: null,
      page: 0,
      totalCount: null,
      loading: false,
      error: null,
    });
  }
}