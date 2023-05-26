import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { DirectionType } from '@kakkoii/types/direction-type';
import { environment } from '@kakkoii/env/environment';
import { Paginator } from '@kakkoii/interfaces/paginator';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getEpisodes(seriesPseudo: string, paginator: Paginator, direction: DirectionType): Observable<{ episodes: SeriesEpisode[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit).set('direction', direction);

    return this.httpClient.get<{ episodes: SeriesEpisode[], totalCount: number }>(`${this.API_URL}/episodes/${seriesPseudo}`, { params });
  }

  public getEpisode(seriesPseudo: string, epNumber: number): Observable<SeriesEpisode> {
    return this.httpClient.get<SeriesEpisode>(`${this.API_URL}/episodes/${seriesPseudo}/${epNumber}`);
  }
}
