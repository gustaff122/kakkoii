import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Series } from '@kakkoii/interfaces/series';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesService } from '@kakkoii/services/series.service';
import { Paginator } from '@kakkoii/interfaces/paginator';

interface SearchGeneralAutocompleteComponentState extends DefaultComponentState {
  series: Series[];
  isOpen: boolean;
}

@Injectable()
export class SearchGeneralAutocompleteComponentStore extends DefaultComponentStore<SearchGeneralAutocompleteComponentState> {

  public readonly series$: Observable<Series[]> = this.select((state) => state.series);
  public readonly hasSeries$: Observable<boolean> = this.select((state) => state.series.length > 0);
  public readonly isOpen$: Observable<boolean> = this.select((state) => state.isOpen);
  public readonly firstSeries$: Observable<Series> = this.select((state) => state.series[0]);

  public readonly getSeries = this.effect((origin$: Observable<{ name: string, callbackFn: () => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ name, callbackFn }) => {
        const paginator: Paginator = {
          limit: 3,
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

            callbackFn();
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

  public readonly clearSeries = this.updater((state): SearchGeneralAutocompleteComponentState => {
    return {
      ...state,
      series: [],
    };
  });

  public readonly open = this.updater((state): SearchGeneralAutocompleteComponentState => {
    return {
      ...state,
      isOpen: true,
    };
  });

  public readonly close = this.updater((state): SearchGeneralAutocompleteComponentState => {
    return {
      ...state,
      isOpen: false,
    };
  });

  constructor(
    private readonly seriesService: SeriesService,
  ) {
    super({
      series: [],
      isOpen: false,
      loading: false,
      error: null,
    });
  }
}