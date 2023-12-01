import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { ActivatedRoute } from '@angular/router';
import { SeriesFilteredLinks } from '@kakkoii/interfaces/series-filtered-players';
import { SeriesPlayer } from '@kakkoii/interfaces/series-player';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { SeriesService } from '@kakkoii/services/series.service';

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
        const animeId = this.activatedRoute.snapshot.data[SERIES].id;

        return this.seriesService.getEpisode(animeId, epNumber)
          .pipe(
            tapResponse(({ episode, players }) => {
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
                episodesCount: 0,
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
    private readonly seriesService: SeriesService,
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