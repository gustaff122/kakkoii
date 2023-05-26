import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, forkJoin, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { ActivatedRoute } from '@angular/router';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { SeriesFilteredLinks } from '@kakkoii/interfaces/series-filtered-links';
import { SeriesLink } from '@kakkoii/interfaces/series-link';

interface SeriesPageEpisodePlayerComponentState extends DefaultComponentState {
  episode: SeriesEpisode | null,
  links: SeriesFilteredLinks[],
  selectedTranslator: number;
  episodesCount: number,
}

@Injectable()
export class SeriesPageEpisodePlayerComponentStore extends DefaultComponentStore<SeriesPageEpisodePlayerComponentState> {

  public readonly episode$: Observable<SeriesEpisode> = this.select((state) => state.episode);
  public readonly links$: Observable<SeriesFilteredLinks[]> = this.select((state) => state.links);
  public readonly linksMirrors$: Observable<SeriesLink[]> = this.select((state) => state.links[state.selectedTranslator].links);
  public readonly episodesCount$: Observable<number | null> = this.select((state) => state.episodesCount);
  public readonly hasLinks$: Observable<boolean> = this.select((state) => !!(state.episode && state.episode.links && state.episode.links.length > 0));

  public readonly getEpisode = this.effect((origin$: Observable<{ epNumber: number, callbackFn: () => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ epNumber, callbackFn }) => {
        const seriesPseudo = this.activatedRoute.snapshot.params['seriesPseudo']
        const paginator: Paginator = {
          page: 1,
          limit: 1,
        }

        return forkJoin([
          this.episodesService.getEpisode(seriesPseudo, epNumber),
          this.episodesService.getEpisodes(seriesPseudo, paginator, 'asc')
        ])
          .pipe(
            tapResponse(([episode, { totalCount }]) => {
              const seriesLinks = episode.links;
              const links = seriesLinks.reduce((acc, link) => {
                const translator = link.translator;

                const existingTranslator = acc.find(item => item.translator === translator);
                if (existingTranslator) {
                  existingTranslator.links.push(link);
                } else {
                  acc.push({ translator, links: [link] });
                }

                return acc;
              }, []);

              this.patchState({
                  episode,
                  links,
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
      selectedTranslator
    };
  });

  constructor(
    private readonly episodesService: EpisodesService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super({
      episode: null,
      episodesCount: null,
      selectedTranslator: 0,
      links: [],
      loading: false,
      error: null,
    });
  }
}