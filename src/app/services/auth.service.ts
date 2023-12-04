import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '@kakkoii/env/environment';
import { User } from '@kakkoii/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public signUp(email: string, login: string, password: string): Observable<User> {
    return this.httpClient.post<{ user: User, message: string }>(`${this.API_URL}/auth/signup`, { email, login, password })
      .pipe(map(resp => resp?.user),
        catchError(() => of(null)),
      );
  }

  public signIn(login: string, password: string): Observable<{ user: User, accessToken: string }> {
    return this.httpClient.post<{ user: User, accessToken: string, message: string }>(`${this.API_URL}/auth/signin`, { login, password })
      .pipe(map(resp => {
            return { user: resp.user, accessToken: resp.accessToken };
          },
        ),
        catchError(() => of(null)),
      );
  }
}
