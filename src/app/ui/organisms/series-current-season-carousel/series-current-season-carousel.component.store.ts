import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesService } from '@kakkoii/services/series.service';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { Season } from '@kakkoii/types/season';

interface SeriesCurrentSeasonCarouselComponentState extends DefaultComponentState {
  series: Series[],
}

@Injectable()
export class SeriesCurrentSeasonCarouselComponentStore extends DefaultComponentStore<SeriesCurrentSeasonCarouselComponentState> {

  public readonly series$: Observable<Series[]> = this.select((state) => state.series);
  public readonly hasSeries$: Observable<boolean> = this.select((state) => state.series.length > 0);

  public readonly getSeries = this.effect((origin$: Observable<void>) => {
    const { season_type, season_year } = this.getSeason();
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

  private getSeason(): { season_type: Season, season_year: number } {
    const month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    const d = new Date();
    const monthName = month[d.getMonth()];
    const season_year = d.getFullYear();

    switch (monthName) {
      case 'January':
      case 'February':
        return { season_type: 'winter', season_year };

      case 'March':
      case 'April':
      case 'May':
        return { season_type: 'spring', season_year };

      case 'June':
      case 'July':
      case 'August':
        return { season_type: 'summer', season_year };

      case 'September':
      case 'October':
      case 'November':
        return { season_type: 'autumn', season_year };

      case 'December':
        return { season_type: 'winter', season_year: season_year + 1 };

      default:
        return { season_type: 'winter', season_year };
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