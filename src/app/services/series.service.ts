import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../interfaces/series';
import { Paginator } from '../interfaces/paginator';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getSeriesList(paginator: Paginator, filters?: Partial<{ name: string }>): Observable<{ series: Series[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit);

    if (filters?.name) {
      params = params.append('name', filters.name);
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
