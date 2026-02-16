import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.authState$.pipe(
      take(1),
      switchMap(authState => {
        if (authState.isAuthenticated) {
          return of(true);
        } else {
          // Not authenticated, redirect to login
          return of(this.router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: state.url }
          }));
        }
      })
    );
  }
}
