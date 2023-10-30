import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Series } from '@kakkoii/interfaces/series';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesService } from '@kakkoii/services/series.service';
import { Paginator } from '@kakkoii/interfaces/paginator';

interface KkSearchAutocompleteComponentState extends DefaultComponentState {
  series: Series[];
}

@Injectable()
export class KkSearchAutocompleteComponentStore extends DefaultComponentStore<KkSearchAutocompleteComponentState> {

  public readonly series$: Observable<Series[]> = this.select((state) => state.series);

  public readonly getSeries = this.effect((origin$: Observable<{ name: string }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ name }) => {
        const paginator: Paginator = {
          limit: 4,
          page: 0,
        };

        const filters: { name: string } = {
          name,
        };

        return this.seriesService.getSeriesList(paginator, filters).pipe(
          tapResponse(({ series }) => {
            this.patchState({
              series,
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

  public readonly clearSeries = this.updater((state): KkSearchAutocompleteComponentState => {
    return {
      ...state,
      series: [],
    };
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