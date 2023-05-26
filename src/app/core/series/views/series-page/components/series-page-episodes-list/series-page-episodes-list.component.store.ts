import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { ActivatedRoute } from '@angular/router';
import { DirectionType } from '@kakkoii/types/direction-type';

interface SeriesPageEpisodesListComponentState extends DefaultComponentState {
  episodes: SeriesEpisode[],
  page: number,
  totalCount: number | null,
}

@Injectable()
export class SeriesPageEpisodesListComponentStore extends DefaultComponentStore<SeriesPageEpisodesListComponentState> {

  public readonly episodes$: Observable<SeriesEpisode[]> = this.select((state) => state.episodes);
  public readonly canLoadMore$: Observable<boolean> = this.select((state) => state.totalCount > state.episodes.length);

  public readonly changeDirection = this.effect((origin$: Observable<{ direction: DirectionType }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
          page: 1
        });
      }),
      exhaustMap(({ direction }) => {
        const seriesPseudo = this.activatedRoute.snapshot.params['seriesPseudo']
        const page = this.get().page;

        const paginator: Paginator = {
          limit: 24,
          page,
        };

        return this.episodesService.getEpisodes(seriesPseudo, paginator, direction)
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

  public readonly getEpisodes = this.effect((origin$: Observable<{ direction: DirectionType }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ direction }) => {
        const seriesPseudo = this.activatedRoute.snapshot.params['seriesPseudo']
        const page = this.get().page;

        const paginator: Paginator = {
          limit: 24,
          page,
        };

        return this.episodesService.getEpisodes(seriesPseudo, paginator, direction)
          .pipe(
            tapResponse(({ episodes, totalCount }) => {
              this.patchState((state) => {
                return {
                  ...state,
                  episodes: [...state.episodes, ...episodes],
                  totalCount,
                  loaded: true,
                  page: this.get().page + 1,
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
    private readonly episodesService: EpisodesService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super({
      episodes: [],
      page: 1,
      totalCount: null,
      loading: false,
      error: null,
    });
  }
}