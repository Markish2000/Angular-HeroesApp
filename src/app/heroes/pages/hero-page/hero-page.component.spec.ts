import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';

import { HeroPageComponent } from './hero-page.component';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

class MockHeroesService {
  getHeroById(id: string) {
    if (id === 'nonexistent') {
      return throwError(() => new Error('Hero not found'));
    }

    const hero: Hero = {
      id,
      superhero: 'Superhero Name',
      publisher: Publisher.DCComics,
      alter_ego: 'Alter Ego',
      first_appearance: 'First Appearance',
      characters: 'Characters',
      alt_img: 'path/to/image.jpg',
    };

    return of(hero);
  }
}

describe('HeroPageComponent', () => {
  let component: HeroPageComponent;
  let fixture: ComponentFixture<HeroPageComponent>;
  let router: Router;
  let heroesService: HeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeroPageComponent],
      providers: [
        { provide: HeroesService, useClass: MockHeroesService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    heroesService = TestBed.inject(HeroesService);
  });

  it('should navigate to list if hero is not found', () => {
    spyOn(heroesService, 'getHeroById').and.returnValue(
      throwError(() => new Error('Hero not found'))
    );
    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/heroes/list']);
  });

  it('should set hero data if hero is found', () => {
    const mockHero: Hero = {
      id: '1',
      superhero: 'Superhero Name',
      publisher: Publisher.DCComics,
      alter_ego: 'Alter Ego',
      first_appearance: 'First Appearance',
      characters: 'Characters',
      alt_img: 'path/to/image.jpg',
    };

    spyOn(heroesService, 'getHeroById').and.returnValue(of(mockHero));

    component.ngOnInit();

    expect(component.hero).toEqual(mockHero);
  });

  it('should navigate to list if hero is not found', () => {
    spyOn(heroesService, 'getHeroById').and.returnValue(
      throwError(() => new Error('Hero not found'))
    );
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/heroes/list']);
  });

  it('should navigate to heroes/list when goBack is called', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    component.goBack();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('heroes/list');
  });
});
