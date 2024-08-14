import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    const url = `${this.baseUrl}/heroes`;
    return this.http.get<Hero[]>(url);
  }

  getHeroById(id: string): Observable<Hero | undefined | null> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.get<Hero>(url).pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    const url = `${this.baseUrl}/heroes?q=${query}&_limit=6`;
    return this.http.get<Hero[]>(url);
  }

  addHero(hero: Hero): Observable<Hero> {
    const url = `${this.baseUrl}/heroes`;
    return this.http.post<Hero>(url, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw new Error('Hero id is required');

    const url = `${this.baseUrl}/heroes/${hero.id}`;
    return this.http.patch<Hero>(url, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/heroes/${id}`;
    return this.http.delete(url).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}
