import { ActivatedRoute, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { of } from 'rxjs';

import { CardComponent } from '../../components/card/card.component';
import { ListPageComponent } from './list-page.component';

import { HeroesService } from '../../services/heroes.service';

import { HeroImagePipe } from '../../pipes/hero-image.pipe';

import { Hero, Publisher } from '../../interfaces/hero.interface';

class MockActivatedRoute {
  paramMap = of({ get: () => 'mockValue' });
  snapshot = { paramMap: { get: () => 'mockValue' } };
}

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let heroesService: HeroesService;

  const mockHeroes: Hero[] = [
    {
      id: '1',
      superhero: 'Superman',
      publisher: Publisher.DCComics,
      alter_ego: 'Clark Kent',
      first_appearance: 'Action Comics #1',
      characters: 'Clark Kent',
    },
    {
      id: '2',
      superhero: 'Batman',
      publisher: Publisher.DCComics,
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
      characters: 'Bruce Wayne',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatDividerModule,
        MatChipsModule,
        MatIconModule,
        RouterModule,
      ],
      declarations: [ListPageComponent, CardComponent, HeroImagePipe],
      providers: [
        HeroesService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);

    // Configure the spy on the HeroesService
    spyOn(heroesService, 'getHeroes').and.returnValue(of(mockHeroes));

    fixture.detectChanges(); // Trigger ngOnInit and other lifecycle hooks
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on initialization', () => {
    // Arrange
    const expectedHeroes = mockHeroes;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.heroes).toEqual(expectedHeroes);
    expect(heroesService.getHeroes).toHaveBeenCalled();
  });
});
