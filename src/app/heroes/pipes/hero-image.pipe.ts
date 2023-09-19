// Angular
import { Pipe, PipeTransform } from '@angular/core';

// Interfaces
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.id && !hero.alter_ego) return 'assets/no-image.png';

    if (hero.alt_img) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`;
  }
}
