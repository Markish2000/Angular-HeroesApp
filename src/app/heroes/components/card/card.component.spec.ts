import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { CardComponent } from './card.component';

import { HeroImagePipe } from '../../pipes/hero-image.pipe';

import { Publisher } from '../../interfaces/hero.interface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatChipsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [CardComponent, HeroImagePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.hero = {
      id: '1',
      superhero: 'Superhero',
      alter_ego: 'Alter Ego',
      publisher: Publisher.DCComics,
      first_appearance: 'First Appearance',
      characters: 'Character1,Character2',
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should throw an error if hero input is not provided', () => {
    component.hero = undefined as any;
    expect(() => {
      component.ngOnInit();
    }).toThrowError('Hero property is required');
  });
});
