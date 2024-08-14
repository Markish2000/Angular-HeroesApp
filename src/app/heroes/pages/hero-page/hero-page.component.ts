import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { catchError, of, switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';

import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
        catchError(() => {
          const url = '/heroes/list';
          this.router.navigate([url]);

          return of(null);
        })
      )
      .subscribe((hero) => {
        if (hero) {
          this.hero = hero;
        }
      });
  }

  public goBack(): void {
    const url = 'heroes/list';

    this.router.navigateByUrl(url);
  }
}
