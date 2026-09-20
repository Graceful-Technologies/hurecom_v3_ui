import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api-service';
import { LoginResponse } from '../models/auth/login-response';
import { LoginRequest } from '../models/auth/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>("/api/auth/login", payload);
  }

  logout(): Observable<any> {
    return this.api.post<any>("/api/auth/logout", {}).pipe(
      tap(() => this.clearToken()),
      catchError(() => {
        this.clearToken();
        return EMPTY;
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  clearToken() {
    localStorage.removeItem("token");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
