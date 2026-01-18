import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/api/admin/users`;

  constructor(private http: HttpClient) {}

  createUser(payload: {
    username: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
    active: boolean;
  }): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }

  updateUserStatus(id: string, active: boolean): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}/status`,
      {},
      { params: { active } }
    );
  }

  // optional: if backend has list users endpoint
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
}

