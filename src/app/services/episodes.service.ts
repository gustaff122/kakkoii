import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { DirectionType } from '@kakkoii/types/direction-type';
import { environment } from '@kakkoii/env/environment';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { SeriesPlayer } from '@kakkoii/interfaces/series-player';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getEpisodes(anime_id: number, paginator: Paginator, direction: DirectionType): Observable<{ episodes: SeriesEpisode[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit).set('direction', direction);

    return this.httpClient.get<{ episodes: SeriesEpisode[], totalCount: number }>(`${this.API_URL}/episodes/${anime_id}`, { params });
  }

  public getEpisode(anime_id: number, episode_no: number): Observable<{ episode: SeriesEpisode, players: SeriesPlayer[] }> {
    return this.httpClient.get<{ episode: SeriesEpisode, players: SeriesPlayer[] }>(`${this.API_URL}/episodes/${anime_id}/${episode_no}`);
  }
}
