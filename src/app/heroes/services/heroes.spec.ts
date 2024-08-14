import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';

import { Hero, Publisher } from '../interfaces/hero.interface';

import { environments } from 'src/environments/environments';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  const baseUrl = environments.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });

    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all heroes', () => {
    const mockHeroes: Hero[] = [
      {
        id: '1',
        superhero: 'Superhero A',
        publisher: Publisher.DCComics,
        alter_ego: 'Alter A',
        first_appearance: 'First A',
        characters: 'Characters A',
      },
      {
        id: '2',
        superhero: 'Superhero B',
        publisher: Publisher.MarvelComics,
        alter_ego: 'Alter B',
        first_appearance: 'First B',
        characters: 'Characters B',
      },
    ];

    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should retrieve a hero by id', () => {
    const mockHero: Hero = {
      id: '1',
      superhero: 'Superhero A',
      publisher: Publisher.DCComics,
      alter_ego: 'Alter A',
      first_appearance: 'First A',
      characters: 'Characters A',
    };

    service.getHeroById('1').subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should handle error when retrieving a hero by id', () => {
    service.getHeroById('nonexistent').subscribe((hero) => {
      expect(hero).toBeUndefined();
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/nonexistent`);
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('should retrieve hero suggestions', () => {
    const mockHeroes: Hero[] = [
      {
        id: '1',
        superhero: 'Superhero A',
        publisher: Publisher.DCComics,
        alter_ego: 'Alter A',
        first_appearance: 'First A',
        characters: 'Characters A',
      },
      {
        id: '2',
        superhero: 'Superhero B',
        publisher: Publisher.MarvelComics,
        alter_ego: 'Alter B',
        first_appearance: 'First B',
        characters: 'Characters B',
      },
    ];

    service.getSuggestions('hero').subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes?q=hero&_limit=6`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should add a hero', () => {
    const newHero: Hero = {
      id: '3',
      superhero: 'Superhero C',
      publisher: Publisher.DCComics,
      alter_ego: 'Alter C',
      first_appearance: 'First C',
      characters: 'Characters C',
    };

    service.addHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newHero);
    req.flush(newHero);
  });

  it('should update a hero', () => {
    const updatedHero: Hero = {
      id: '1',
      superhero: 'Superhero A Updated',
      publisher: Publisher.DCComics,
      alter_ego: 'Alter A',
      first_appearance: 'First A',
      characters: 'Characters A',
    };

    service.updateHero(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedHero);
    req.flush(updatedHero);
  });

  it('should throw an error if hero id is missing when updating', () => {
    const hero: Hero = {
      id: '',
      superhero: 'Superhero A',
      publisher: Publisher.DCComics,
      alter_ego: 'Alter A',
      first_appearance: 'First A',
      characters: 'Characters A',
    };

    expect(() => service.updateHero(hero)).toThrowError('Hero id is required');
  });

  it('should delete a hero by id', () => {
    service.deleteHeroById('1').subscribe((result) => {
      expect(result).toBeTrue();
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle error when deleting a hero by id', () => {
    service.deleteHeroById('nonexistent').subscribe((result) => {
      expect(result).toBeFalse();
    });

    const req = httpMock.expectOne(`${baseUrl}/heroes/nonexistent`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });
});
