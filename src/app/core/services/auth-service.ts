import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
