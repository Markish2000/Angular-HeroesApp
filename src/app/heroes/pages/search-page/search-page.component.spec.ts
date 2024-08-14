import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';

import { SearchPageComponent } from './search-page.component';

import { HeroesService } from '../../services/heroes.service';

import { Hero, Publisher } from '../../interfaces/hero.interface';

class MockHeroesService {
  getSuggestions(value: string) {
    return of([]);
  }
}

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let heroesService: HeroesService;

  const mockHeroes: Hero[] = [
    {
      id: '1',
      superhero: 'Iron Man',
      alter_ego: 'Tony Stark',
      first_appearance: 'Tales of Suspense #39',
      characters: 'Tony Stark',
      publisher: Publisher.MarvelComics,
      alt_img: 'http://example.com/image.jpg',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule],
      declarations: [SearchPageComponent],
      providers: [{ provide: HeroesService, useClass: MockHeroesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);

    spyOn(heroesService, 'getSuggestions').and.returnValue(of(mockHeroes));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSuggestions and update heroes list on searchHero', () => {
    component.searchInput.setValue('Iron');

    component.searchHero();

    expect(heroesService.getSuggestions).toHaveBeenCalledWith('Iron');

    expect(component.heroes).toEqual(mockHeroes);
  });

  it('should update selectedHero and searchInput on onSelectedOption', () => {
    const event = {
      option: {
        value: mockHeroes[0],
      },
    } as MatAutocompleteSelectedEvent;

    component.onSelectedOption(event);

    expect(component.selectedHero).toEqual(mockHeroes[0]);

    expect(component.searchInput.value).toBe(mockHeroes[0].superhero);
  });

  it('should clear selectedHero if no option is selected', () => {
    const event = {
      option: {
        value: null,
      },
    } as MatAutocompleteSelectedEvent;

    component.onSelectedOption(event);

    expect(component.selectedHero).toBeUndefined();
  });
});
