import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, forkJoin, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { ActivatedRoute } from '@angular/router';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { SeriesFilteredLinks } from '@kakkoii/interfaces/series-filtered-players';
import { SeriesPlayer } from '@kakkoii/interfaces/series-player';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';

interface SeriesPageEpisodePlayerComponentState extends DefaultComponentState {
  episode: SeriesEpisode | null,
  players: SeriesFilteredLinks[],
  selectedTranslator: number;
  episodesCount: number,
}

@Injectable()
export class SeriesPageEpisodePlayerComponentStore extends DefaultComponentStore<SeriesPageEpisodePlayerComponentState> {
  public readonly episode$: Observable<SeriesEpisode> = this.select((state) => state.episode);
  public readonly players$: Observable<SeriesFilteredLinks[]> = this.select((state) => state.players);
  public readonly playersMirrors$: Observable<SeriesPlayer[]> = this.select((state) => state.players[state.selectedTranslator].players);
  public readonly episodesCount$: Observable<number | null> = this.select((state) => state.episodesCount);
  public readonly hasPlayers$: Observable<boolean> = this.select((state) => !!state.players);

  public readonly getEpisode = this.effect((origin$: Observable<{ epNumber: number, callbackFn: () => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ epNumber, callbackFn }) => {
        const animeId = this.activatedRoute.snapshot.data[SERIES].anime_id;
        const paginator: Paginator = {
          page: 1,
          limit: 1,
        };

        return forkJoin([
          this.episodesService.getEpisode(animeId, epNumber),
          this.episodesService.getEpisodes(animeId, paginator, 'asc'),
        ])
          .pipe(
            tapResponse(([ { episode, players }, { totalCount } ]) => {
              const links = players.reduce((acc, link) => {
                const translator = link.translator;

                const existingTranslator = acc.find(item => item.translator === translator);
                if (existingTranslator) {
                  existingTranslator.players.push(link);
                } else {
                  acc.push({ translator, players: [ link ] });
                }

                return acc;
              }, []);

              this.patchState({
                episode,
                players: links,
                episodesCount: totalCount,
                loading: false,
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

  public readonly selectTranslator = this.updater((state, { selectedTranslator }: { selectedTranslator: number }): SeriesPageEpisodePlayerComponentState => {
    return {
      ...state,
      selectedTranslator,
    };
  });

  constructor(
    private readonly episodesService: EpisodesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super({
      episode: null,
      episodesCount: null,
      selectedTranslator: 0,
      players: [],
      loading: false,
      error: null,
    });
  }
}