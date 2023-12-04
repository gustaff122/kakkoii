import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeriesRelation } from '@kakkoii/interfaces/series-relation';
import { environment } from '@kakkoii/env/environment';

@Injectable({
  providedIn: 'root',
})
export class RelationsService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getSeriesRelations(seriesId: string): Observable<SeriesRelation[]> {
    const headers: HttpHeaders = new HttpHeaders({
      'Snackbar': 'false',
    });

    return this.httpClient.get<SeriesRelation[]>(`${this.API_URL}/relations/${seriesId}`, { headers });
  }
}
