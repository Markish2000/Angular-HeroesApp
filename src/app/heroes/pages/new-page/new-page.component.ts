// Angular Core
import { Component, OnInit } from '@angular/core';

// Angular Router
import { ActivatedRoute, Router } from '@angular/router';

// Angular Forms
import { FormControl, FormGroup } from '@angular/forms';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Libraries
import { filter, tap, switchMap } from 'rxjs';

// Components
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

// Services
import { HeroesService } from '../../services/heroes.service';

// Interfaces
import { Hero, Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    alt_img: new FormControl(''),
    alter_ego: new FormControl(''),
    characters: new FormControl(''),
    first_appearance: new FormControl(''),
    id: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    superhero: new FormControl<string>('', { nonNullable: true }),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Hecho', { duration: 2500 });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`${hero.superhero} actualizado!`);
      });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.showSnackbar(`${hero.superhero} creado!`);
    });
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw new Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.router.navigate(['heroes']);
      });
  }
}
