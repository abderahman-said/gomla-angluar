import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer, of } from 'rxjs';
import { catchError, retry, timeout, map } from 'rxjs/operators';
import { APP_CONFIG, API_ENDPOINTS } from '../../constants';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = APP_CONFIG.API.BASE_URL;
  private defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  constructor(private http: HttpClient) {}

  // Generic HTTP methods
  get<T>(endpoint: string, params?: any, headers?: any): Observable<ApiResponse<T>> {
    const httpParams = this.buildParams(params);
    const httpHeaders = this.buildHeaders(headers);

    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      headers: httpHeaders
    }).pipe(
      timeout(APP_CONFIG.API.TIMEOUT),
      retry({
        count: APP_CONFIG.API.RETRY_ATTEMPTS,
        delay: APP_CONFIG.API.RETRY_DELAY,
        resetOnSuccess: true
      }),
      catchError(this.handleError.bind(this))
    );
  }

  post<T>(endpoint: string, body?: any, headers?: any): Observable<ApiResponse<T>> {
    const httpHeaders = this.buildHeaders(headers);

    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body, {
      headers: httpHeaders
    }).pipe(
      timeout(APP_CONFIG.API.TIMEOUT),
      catchError(this.handleError.bind(this))
    );
  }

  put<T>(endpoint: string, body?: any, headers?: any): Observable<ApiResponse<T>> {
    const httpHeaders = this.buildHeaders(headers);

    return this.http.put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body, {
      headers: httpHeaders
    }).pipe(
      timeout(APP_CONFIG.API.TIMEOUT),
      catchError(this.handleError.bind(this))
    );
  }

  patch<T>(endpoint: string, body?: any, headers?: any): Observable<ApiResponse<T>> {
    const httpHeaders = this.buildHeaders(headers);

    return this.http.patch<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body, {
      headers: httpHeaders
    }).pipe(
      timeout(APP_CONFIG.API.TIMEOUT),
      catchError(this.handleError.bind(this))
    );
  }

  delete<T>(endpoint: string, params?: any, headers?: any): Observable<ApiResponse<T>> {
    const httpParams = this.buildParams(params);
    const httpHeaders = this.buildHeaders(headers);

    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      headers: httpHeaders
    }).pipe(
      timeout(APP_CONFIG.API.TIMEOUT),
      catchError(this.handleError.bind(this))
    );
  }

  // File upload methods
  upload<T>(endpoint: string, file: File, additionalData?: any): Observable<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers = new HttpHeaders({
      'Accept': 'application/json'
      // Don't set Content-Type for FormData - browser will set it with boundary
    });

    return this.http.post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, formData, {
      headers
    }).pipe(
      timeout(APP_CONFIG.API.TIMEOUT * 2), // Longer timeout for uploads
      catchError(this.handleError.bind(this))
    );
  }

  // Download methods
  download(endpoint: string, params?: any): Observable<Blob> {
    const httpParams = this.buildParams(params);
    const headers = this.buildHeaders();

    return this.http.get(`${this.baseUrl}${endpoint}`, {
      params: httpParams,
      headers,
      responseType: 'blob'
    }).pipe(
      timeout(APP_CONFIG.API.TIMEOUT),
      catchError(this.handleError.bind(this))
    );
  }

  // Helper methods
  private buildParams(params?: any): HttpParams {
    if (!params) return new HttpParams();

    let httpParams = new HttpParams();

    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => httpParams = httpParams.append(key, item.toString()));
        } else if (typeof value === 'object') {
          httpParams = httpParams.set(key, JSON.stringify(value));
        } else {
          httpParams = httpParams.set(key, value.toString());
        }
      }
    });

    return httpParams;
  }

  private buildHeaders(customHeaders?: any): HttpHeaders {
    let headers = new HttpHeaders(this.defaultHeaders);

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Add custom headers
    if (customHeaders) {
      Object.keys(customHeaders).forEach(key => {
        headers = headers.set(key, customHeaders[key]);
      });
    }

    return headers;
  }

  private getAuthToken(): string | null {
    // This will be handled by the AuthInterceptor
    return null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let apiError: ApiError = {
      message: 'An unexpected error occurred'
    };

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      apiError.message = error.error.message;
    } else {
      // Server-side error
      if (error.error && typeof error.error === 'object') {
        apiError = {
          message: error.error.message || error.statusText,
          code: error.error.code,
          details: error.error.details || error.error.errors
        };
      } else {
        apiError.message = error.statusText || `Server error: ${error.status}`;
      }
    }

    console.error('API Error:', apiError, error);
    return throwError(() => apiError);
  }

  // Convenience methods for common endpoints
  // Auth
  login(credentials: { email: string; password: string }) {
    return this.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  register(userData: any) {
    return this.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  logout() {
    return this.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  refreshToken() {
    return this.post(API_ENDPOINTS.AUTH.REFRESH);
  }

  // Users
  getUsers(params?: any) {
    return this.get(API_ENDPOINTS.USERS.LIST, params);
  }

  getUser(id: string) {
    return this.get(API_ENDPOINTS.USERS.DETAIL(id));
  }

  updateUser(id: string, data: any) {
    return this.put(API_ENDPOINTS.USERS.UPDATE(id), data);
  }

  // Products
  getProducts(params?: any) {
    return this.get(API_ENDPOINTS.PRODUCTS.LIST, params);
  }

  getProduct(id: string) {
    return this.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
  }

  createProduct(productData: any) {
    return this.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
  }

  updateProduct(id: string, productData: any) {
    return this.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData);
  }

  deleteProduct(id: string) {
    return this.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  }

  // Orders
  getOrders(params?: any) {
    return this.get(API_ENDPOINTS.ORDERS.LIST, params);
  }

  getOrder(id: string) {
    return this.get(API_ENDPOINTS.ORDERS.DETAIL(id));
  }

  createOrder(orderData: any) {
    return this.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
  }

  updateOrder(id: string, orderData: any) {
    return this.put(API_ENDPOINTS.ORDERS.UPDATE(id), orderData);
  }

  cancelOrder(id: string, reason?: string) {
    return this.post(API_ENDPOINTS.ORDERS.CANCEL(id), { reason });
  }
}
