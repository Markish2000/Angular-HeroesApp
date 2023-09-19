// Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { catchError, Observable, of } from 'rxjs';

// Interfaces
import { Hero } from '../interfaces/hero.interface';

// Environments
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    const url = `${this.baseUrl}/heroes`;
    return this.http.get<Hero[]>(url);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.get<Hero>(url).pipe(catchError((error) => of(undefined)));
  }
}
