import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === HttpStatusCode.Unauthorized) {
          // Try to refresh the token
          return this.authService.refreshAuthToken().pipe(
            switchMap(() => {
              // Token refreshed successfully, retry the original request
              const token = this.authService.accessToken;
              if (token) {
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`
                  }
                });
              }
              return next.handle(request);
            }),
            catchError(() => {
              // Token refresh failed, logout user
              this.authService.logout();
              return EMPTY;
            })
          );
        }

        // Handle 403 Forbidden errors
        if (error.status === HttpStatusCode.Forbidden) {
          console.error('Access forbidden:', error);
          // You could redirect to access denied page here
          return throwError(() => error);
        }

        // Handle 404 Not Found errors
        if (error.status === HttpStatusCode.NotFound) {
          console.error('Resource not found:', error);
          return throwError(() => error);
        }

        // Handle 500 Server errors
        if (error.status >= HttpStatusCode.InternalServerError) {
          console.error('Server error:', error);
          // You could show a global error message here
          return throwError(() => error);
        }

        // Handle network errors
        if (error.status === 0) {
          console.error('Network error:', error);
          // You could show a network error message here
          return throwError(() => error);
        }

        // For all other errors, just throw them
        return throwError(() => error);
      })
    );
  }
}
