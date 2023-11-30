import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarProvider } from '@kakkoii/providers/snackbar.provider';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly snackbarProvider: SnackbarProvider,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = error.error.message;

          this.snackbarProvider.showErrorSnackbar(message);
          return throwError(() => message);
        }),
      );
  }
}