import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { HeroesRoutingModule } from './heroes-routing.module';

import { first } from 'rxjs';

import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

describe('HeroesRoutingModule', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LayoutPageComponent,
            children: [
              { path: 'new-hero', component: NewPageComponent },
              { path: 'search', component: SearchPageComponent },
              { path: 'edit/:id', component: NewPageComponent },
              { path: 'list', component: ListPageComponent },
              { path: ':id', component: HeroPageComponent },
              { path: '**', redirectTo: 'list' },
            ],
          },
        ]),
        HeroesRoutingModule,
      ],
      declarations: [
        LayoutPageComponent,
        HeroPageComponent,
        ListPageComponent,
        NewPageComponent,
        SearchPageComponent,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should navigate to "new-hero" route', async () => {
    router.navigate(['/new-hero']);
    await router.events
      .pipe(first((event: any) => event instanceof NavigationEnd))
      .toPromise();
    expect(router.url).toBe('/new-hero');
  });

  it('should navigate to "search" route', async () => {
    router.navigate(['/search']);
    await router.events
      .pipe(first((event: any) => event instanceof NavigationEnd))
      .toPromise();
    expect(router.url).toBe('/search');
  });

  it('should navigate to "edit/:id" route with id parameter', async () => {
    router.navigate(['/edit/1']);
    await router.events
      .pipe(first((event: any) => event instanceof NavigationEnd))
      .toPromise();
    expect(router.url).toBe('/edit/1');
  });

  it('should navigate to ":id" route with id parameter', async () => {
    router.navigate(['/1']);
    await router.events
      .pipe(first((event: any) => event instanceof NavigationEnd))
      .toPromise();
    expect(router.url).toBe('/1');
  });
});
