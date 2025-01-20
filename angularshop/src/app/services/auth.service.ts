// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  // Method to get the logged-in user's ID
  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  // Method to get the logged-in user's data
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Method to handle user login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
        localStorage.setItem('userId', response.id);
      })
    );
  }

  // Method to handle user logout
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }

  // Method to handle user registration
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
