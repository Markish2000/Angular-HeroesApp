// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Libraries
import { Observable, tap, of, map, catchError } from 'rxjs';

// Interfaces
import { User } from '../interfaces/user.interface';

// Environments
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    const url = `${this.baseUrl}/users/1`;
    return this.http.get<User>(url).pipe(
      tap((user) => (this.user = user)),
      tap((user) =>
        localStorage.setItem('token', 'adasdasdasd.asdasdasdas.sdasdasdasdasd')
      )
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    const url = `${this.baseUrl}/users/1`;

    return this.http.get<User>(url).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError((err) => of(false))
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
