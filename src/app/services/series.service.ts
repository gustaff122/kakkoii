import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeriesListFilters } from '@kakkoii/interfaces/series-list-filters';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { Series } from '@kakkoii/interfaces/series';
import { environment } from '@kakkoii/env/environment';
import { DirectionType } from '@kakkoii/types/direction-type';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { SeriesPlayer } from '@kakkoii/interfaces/series-player';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getSeriesList(paginator: Paginator, filters?: Partial<SeriesListFilters>): Observable<{ series: Series[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit);

    if (filters?.name) {
      params = params.append('name', filters.name);
    }

    if (filters?.status) {
      params = params.append('status', filters.status);
    }

    if (filters?.type) {
      params = params.append('type', filters.type);
    }

    if (filters?.tags) {
      filters.tags.forEach(tag => {
        params = params.append('tags', tag);
      });
    }

    if (filters?.season) {
      params = params.append('season', filters.season);
    }

    if (filters?.year) {
      params = params.append('year', filters.year);
    }

    return this.httpClient.get<{ series: Series[], totalCount: number }>(`${this.API_URL}/series`, { params });
  }

  public getSeries(seriesId: string): Observable<Series> {
    return this.httpClient.get<Series>(`${this.API_URL}/series/${seriesId}`);
  }

  public getSeriesByPseudo(seriesPseudo: string): Observable<Series> {
    return this.httpClient.get<Series>(`${this.API_URL}/series/pseudo/${seriesPseudo}`);
  }

  public getEpisodes(anime_id: number, paginator: Paginator, direction: DirectionType): Observable<{ episodes: SeriesEpisode[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit).set('direction', direction);

    return this.httpClient.get<{ episodes: SeriesEpisode[], totalCount: number }>(`${this.API_URL}/series/episodes/${anime_id}`, { params });
  }

  public getEpisode(anime_id: string, episodeno: number): Observable<{ episode: SeriesEpisode, players: SeriesPlayer[] }> {
    return this.httpClient.get<{ episode: SeriesEpisode, players: SeriesPlayer[] }>(`${this.API_URL}/series/episodes/${anime_id}/${episodeno}`);
  }
}
