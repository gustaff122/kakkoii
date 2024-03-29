import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { ActivatedRoute } from '@angular/router';
import { DirectionType } from '@kakkoii/types/direction-type';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { SeriesService } from '@kakkoii/services/series.service';

interface SeriesPageEpisodesListComponentState extends DefaultComponentState {
  episodes: SeriesEpisode[],
  page: number,
  totalCount: number | null,
}

@Injectable()
export class SeriesPageEpisodesListComponentStore extends DefaultComponentStore<SeriesPageEpisodesListComponentState> {

  public readonly episodes$: Observable<SeriesEpisode[]> = this.select((state) => state.episodes);
  public readonly totalCount$: Observable<number | null> = this.select((state) => state.totalCount);
  public readonly canLoadMore$: Observable<boolean> = this.select((state) => state.totalCount > state.episodes.length);

  public readonly changeDirection = this.effect((origin$: Observable<{ direction: DirectionType }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
          page: 0,
        });
      }),
      exhaustMap(({ direction }) => {
        const anime_id = this.activatedRoute.snapshot.data[SERIES].id;
        const page = this.get().page;

        const paginator: Paginator = {
          limit: 24,
          page,
        };

        return this.seriesService.getEpisodes(anime_id, paginator, direction)
          .pipe(
            tapResponse(({ episodes, totalCount }) => {
              this.patchState((state) => {
                return {
                  ...state,
                  episodes,
                  totalCount,
                  loaded: true,
                  page: this.get().page + 1,
                  loading: false,
                };
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

  public readonly getEpisodes = this.effect((origin$: Observable<{ direction: DirectionType }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ direction }) => {
        const animeId = this.activatedRoute.snapshot.data[SERIES].id;
        const page = this.get().page;

        const paginator: Paginator = {
          limit: 12,
          page,
        };

        return this.seriesService.getEpisodes(animeId, paginator, direction)
          .pipe(
            tapResponse(({ episodes, totalCount }) => {
              this.patchState((state) => {
                return {
                  ...state,
                  episodes: [ ...state.episodes, ...episodes ],
                  totalCount,
                  loaded: true,
                  page: this.get().page + 1,
                  loading: false,
                };
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
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super({
      episodes: [],
      page: 0,
      totalCount: null,
      loading: false,
      error: null,
    });
  }
}