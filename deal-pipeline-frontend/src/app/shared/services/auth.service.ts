import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly USERNAME_KEY = 'username';

  constructor(private http: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, payload)
      .pipe(
        tap((res) => {
          localStorage.setItem(this.TOKEN_KEY, res.token);

          // decode role from JWT (your backend includes role claim)
          const role = this.extractRole(res.token);
          const username = this.extractUsername(res.token);

          if (role) localStorage.setItem(this.ROLE_KEY, role);
          if (username) localStorage.setItem(this.USERNAME_KEY, username);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }
  isAdmin(): boolean {
  return (this.getRole() || '').toUpperCase() === 'ADMIN';
}

getUsername(): string | null {
  return localStorage.getItem(this.USERNAME_KEY);
}


  // ---------- JWT decode helpers ----------
  private decodePayload(token: string): any | null {
    try {
      const payloadPart = token.split('.')[1];
      const payloadJson = atob(payloadPart);
      return JSON.parse(payloadJson);
    } catch {
      return null;
    }
  }

  private extractRole(token: string): string | null {
    const payload = this.decodePayload(token);
    // in your backend role claim name = "role"
    return payload?.role ?? null;
  }

  private extractUsername(token: string): string | null {
    const payload = this.decodePayload(token);
    // subject may be in "sub"
    return payload?.sub ?? null;
  }
}
