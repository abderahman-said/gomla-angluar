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
import { UserRole } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
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
        if (!authState.isAuthenticated) {
          // Not authenticated, redirect to login
          return of(this.router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: state.url }
          }));
        }

        // Get required roles from route data
        const requiredRoles = route.data['roles'] as UserRole[];
        
        if (!requiredRoles || requiredRoles.length === 0) {
          // No specific roles required, allow access
          return of(true);
        }

        // Check if user has required role
        const hasRequiredRole = this.authService.canAccessFeature(requiredRoles);
        
        if (hasRequiredRole) {
          return of(true);
        } else {
          // User doesn't have required role, redirect to unauthorized page
          return of(this.router.createUrlTree(['/unauthorized']));
        }
      })
    );
  }
}
