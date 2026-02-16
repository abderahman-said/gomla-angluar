import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { User, UserRole } from '../../models';
import { APP_CONFIG } from '../../constants';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  businessName?: string;
  businessLicense?: string;
  taxId?: string;
  address: any;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null
  });

  public authState$ = this.authStateSubject.asObservable();

  private tokenRefreshTimer: any;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) {
    this.initializeAuth();
  }

  // Getters
  get isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  get currentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  get isLoading(): boolean {
    return this.authStateSubject.value.isLoading;
  }

  get error(): string | null {
    return this.authStateSubject.value.error;
  }

  get accessToken(): string | null {
    return this.storageService.get(APP_CONFIG.AUTH.TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return this.storageService.get(APP_CONFIG.AUTH.REFRESH_TOKEN_KEY);
  }

  // Public methods
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.setLoading(true);
    this.clearError();

    return this.apiService.post<AuthResponse>('auth/login', credentials).pipe(
      map(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data, credentials.rememberMe);
          return response.data;
        } else {
          throw new Error(response.message || 'Login failed');
        }
      }),
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setError(error.message || 'Login failed');
        this.setLoading(false);
        throw error;
      })
    );
  }

  register(userData: RegisterData): Observable<AuthResponse> {
    this.setLoading(true);
    this.clearError();

    return this.apiService.post<AuthResponse>('auth/register', userData).pipe(
      map(response => {
        if (response.success && response.data) {
          this.handleAuthSuccess(response.data);
          return response.data;
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      }),
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setError(error.message || 'Registration failed');
        this.setLoading(false);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    return this.apiService.post('auth/logout').pipe(
      tap(() => {
        this.clearAuth();
      }),
      catchError(error => {
        // Even if logout fails on server, clear local auth
        this.clearAuth();
        return of(null);
      })
    );
  }

  refreshAuthToken(): Observable<AuthResponse | null> {
    const token = this.refreshToken;
    if (!token) {
      return of(null);
    }

    return this.apiService.post<AuthResponse>('auth/refresh', { refreshToken: token }).pipe(
      map(response => {
        if (response.success && response.data) {
          this.updateTokens(response.data);
          return response.data;
        } else {
          this.clearAuth();
          return null;
        }
      }),
      catchError(error => {
        this.clearAuth();
        return of(null);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.apiService.post('auth/forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.apiService.post('auth/reset-password', { token, newPassword });
  }

  verifyEmail(token: string): Observable<any> {
    return this.apiService.post('auth/verify-email', { token });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.apiService.post('auth/change-password', {
      currentPassword,
      newPassword
    });
  }

  updateProfile(profileData: Partial<User>): Observable<User> {
    return this.apiService.put<User>('auth/profile', profileData).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.updateUser(response.data);
        }
      }),
      map(response => response.data)
    );
  }

  // Role-based methods
  hasRole(role: UserRole | UserRole[]): boolean {
    if (!this.currentUser) return false;
    
    if (Array.isArray(role)) {
      return role.includes(this.currentUser.role);
    }
    
    return this.currentUser.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  isImporter(): boolean {
    return this.hasRole(UserRole.IMPORTER);
  }

  isManufacturer(): boolean {
    return this.hasRole(UserRole.MANUFACTURER);
  }

  isRetailer(): boolean {
    return this.hasRole(UserRole.RETAILER);
  }

  isWholesaler(): boolean {
    return this.hasRole(UserRole.WHOLESALER);
  }

  canAccessFeature(requiredRoles: UserRole[]): boolean {
    return this.hasRole(requiredRoles);
  }

  // Private methods
  private initializeAuth(): void {
    const token = this.accessToken;
    const user = this.storageService.get(APP_CONFIG.AUTH.USER_KEY);

    if (token && user) {
      try {
        const parsedUser = typeof user === 'string' ? JSON.parse(user) : user;
        this.setAuthState({
          isAuthenticated: true,
          user: parsedUser,
          isLoading: false,
          error: null
        });
        this.scheduleTokenRefresh();
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        this.clearAuth();
      }
    }
  }

  private handleAuthSuccess(authData: AuthResponse, rememberMe: boolean = false): void {
    const storageType = rememberMe ? 'localStorage' : 'sessionStorage';
    
    this.storageService.set(APP_CONFIG.AUTH.TOKEN_KEY, authData.accessToken, storageType);
    this.storageService.set(APP_CONFIG.AUTH.REFRESH_TOKEN_KEY, authData.refreshToken, storageType);
    this.storageService.set(APP_CONFIG.AUTH.USER_KEY, JSON.stringify(authData.user), storageType);

    this.setAuthState({
      isAuthenticated: true,
      user: authData.user,
      isLoading: false,
      error: null
    });

    this.scheduleTokenRefresh();
  }

  private updateTokens(authData: AuthResponse): void {
    this.storageService.set(APP_CONFIG.AUTH.TOKEN_KEY, authData.accessToken);
    this.storageService.set(APP_CONFIG.AUTH.REFRESH_TOKEN_KEY, authData.refreshToken);
    this.scheduleTokenRefresh();
  }

  private updateUser(user: User): void {
    this.storageService.set(APP_CONFIG.AUTH.USER_KEY, JSON.stringify(user));
    this.setAuthState({
      ...this.authStateSubject.value,
      user
    });
  }

  private clearAuth(): void {
    this.storageService.remove(APP_CONFIG.AUTH.TOKEN_KEY);
    this.storageService.remove(APP_CONFIG.AUTH.REFRESH_TOKEN_KEY);
    this.storageService.remove(APP_CONFIG.AUTH.USER_KEY);

    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }

    this.setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null
    });
  }

  private scheduleTokenRefresh(): void {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }

    // Schedule refresh 5 minutes before expiry
    const refreshTime = APP_CONFIG.AUTH.TOKEN_EXPIRY_BUFFER * 1000;
    
    this.tokenRefreshTimer = setTimeout(() => {
      this.refreshAuthToken().subscribe({
        next: (result: AuthResponse | null) => {
          if (!result) {
            this.clearAuth();
          }
        },
        error: () => {
          // Refresh failed, clear auth
          this.clearAuth();
        }
      });
    }, refreshTime);
  }

  private setAuthState(state: AuthState): void {
    this.authStateSubject.next(state);
  }

  private setLoading(loading: boolean): void {
    this.setAuthState({
      ...this.authStateSubject.value,
      isLoading: loading
    });
  }

  private setError(error: string | null): void {
    this.setAuthState({
      ...this.authStateSubject.value,
      error
    });
  }

  private clearError(): void {
    this.setError(null);
  }
}
