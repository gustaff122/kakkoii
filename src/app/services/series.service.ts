import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeriesListFilters } from '@kakkoii/interfaces/series-list-filters';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { Series } from '@kakkoii/interfaces/series';
import { environment } from '@kakkoii/env/environment';

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

    if (filters?.season_type) {
      params = params.append('season_type', filters.season_type);
    }

    if (filters?.season_year) {
      params = params.append('season_year', filters.season_year);
    }

    return this.httpClient.get<{ series: Series[], totalCount: number }>(`${this.API_URL}/series`, { params });
  }

  public getSeries(seriesId: string): Observable<Series> {
    return this.httpClient.get<Series>(`${this.API_URL}/series/${seriesId}`);
  }

  public getSeriesByPseudo(seriesPseudo: string): Observable<Series> {
    return this.httpClient.get<Series>(`${this.API_URL}/series/pseudo/${seriesPseudo}`);
  }
}
