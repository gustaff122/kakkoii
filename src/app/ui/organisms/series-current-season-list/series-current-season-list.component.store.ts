import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesService } from '@kakkoii/services/series.service';
import { Paginator } from '@kakkoii/interfaces/paginator';

interface SeriesCurrentSeasonListComponentState extends DefaultComponentState {
  series: Series[],
}

@Injectable()
export class SeriesCurrentSeasonListComponentStore extends DefaultComponentStore<SeriesCurrentSeasonListComponentState> {

  public readonly series$: Observable<Series[]> = this.select((state) => state.series);
  public readonly hasSeries$: Observable<boolean> = this.select((state) => state.series.length > 0);

  public readonly getSeries = this.effect((origin$: Observable<void>) => {
    const { season, year } = this.getSeason();
    const paginator: Paginator = {
      page: 0,
      limit: 12
    }

    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(() => {
        return this.seriesService.getSeriesList(paginator, { year, season })
          .pipe(
            tapResponse(({ series }) => {
              this.patchState( {
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

  private getSeason(): { season: 'winter' | 'fall' | 'spring' | 'summer', year: number } {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    const monthName = month[d.getMonth()];
    const year = d.getFullYear();

    switch (monthName) {
      case 'January':
      case 'February':
        return { season: 'winter', year };

      case 'March':
      case 'April':
      case 'May':
        return { season: 'spring', year };

      case 'June':
      case 'July':
      case 'August':
        return { season: 'summer', year };

      case 'September':
      case 'October':
      case 'November':
        return { season: 'fall', year };

      case 'December':
        return { season: 'winter', year: year + 1 }

      default:
        return { season: 'winter', year }
    }
  }

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