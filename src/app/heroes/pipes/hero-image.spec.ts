import { HeroImagePipe } from './hero-image.pipe';

import { Hero, Publisher } from '../interfaces/hero.interface';

describe('HeroImagePipe', () => {
  let pipe: HeroImagePipe;

  beforeEach(() => {
    pipe = new HeroImagePipe();
  });

  it('should return default image if hero has no id or alter_ego', () => {
    const hero: Hero = {
      id: '',
      superhero: 'Superhero',
      alter_ego: '',
      publisher: Publisher.DCComics,
      first_appearance: '',
      characters: '',
    };
    expect(pipe.transform(hero)).toBe('assets/no-image.png');
  });

  it('should return alternative image if alt_img is provided', () => {
    const hero: Hero = {
      id: '1',
      superhero: 'Superhero',
      alter_ego: 'Alter Ego',
      publisher: Publisher.DCComics,
      first_appearance: 'First Appearance',
      characters: 'Character1,Character2',
      alt_img: 'assets/alt-image.jpg',
    };
    expect(pipe.transform(hero)).toBe('assets/alt-image.jpg');
  });

  it('should return image path with hero id if alt_img is not provided', () => {
    const hero: Hero = {
      id: '2',
      superhero: 'Superhero',
      alter_ego: 'Alter Ego',
      publisher: Publisher.DCComics,
      first_appearance: 'First Appearance',
      characters: 'Character1,Character2',
    };
    expect(pipe.transform(hero)).toBe('assets/heroes/2.jpg');
  });
});
