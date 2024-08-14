import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { NewPageComponent } from './new-page.component';

import { HeroesService } from '../../services/heroes.service';

import { HeroImagePipe } from '../../pipes/hero-image.pipe';

import { Publisher } from '../../interfaces/hero.interface';

class MockActivatedRoute {
  params = of({ id: '1' });
}

class MockRouter {
  url = '/heroes/new';
  navigate(commands: any[]) {}
  navigateByUrl(url: string) {}
}

describe('NewPageComponent', () => {
  let component: NewPageComponent;
  let fixture: ComponentFixture<NewPageComponent>;
  let heroesService: HeroesService;
  let snackbar: MatSnackBar;
  let dialog: MatDialog;
  let router: Router;

  const mockHero: any = {
    alt_img: 'http://example.com/image.jpg',
    alter_ego: 'Tony Stark',
    characters: 'Tony Stark',
    first_appearance: 'Tales of Suspense #39',
    id: '1',
    publisher: Publisher.MarvelComics,
    superhero: 'Iron Man',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDividerModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [NewPageComponent, ConfirmDialogComponent, HeroImagePipe],
      providers: [
        HeroesService,
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy() } },
        {
          provide: MatDialog,
          useValue: {
            open: jasmine
              .createSpy()
              .and.returnValue({ afterClosed: () => of(true) } as any),
          },
        },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPageComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    snackbar = TestBed.inject(MatSnackBar);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);

    // Configura espías en cada prueba para evitar conflictos
    spyOn(heroesService, 'addHero').and.returnValue(of(mockHero));
    spyOn(heroesService, 'updateHero').and.returnValue(of(mockHero));
    spyOn(heroesService, 'deleteHeroById').and.returnValue(of(true));
    spyOn(router, 'navigate');
    spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show snackbar message on save', () => {
    component.heroForm.setValue({
      superhero: mockHero.superhero,
      alter_ego: mockHero.alter_ego,
      first_appearance: mockHero.first_appearance,
      characters: mockHero.characters,
      publisher: mockHero.publisher,
      alt_img: mockHero.alt_img,
      id: '',
    });

    component.onSubmit();

    expect(snackbar.open).toHaveBeenCalledWith(
      `${mockHero.superhero} creado!`,
      'Hecho',
      { duration: 2500 }
    );
  });

  it('should show snackbar message on update', () => {
    component.heroForm.setValue(mockHero);

    component.onSubmit();

    expect(snackbar.open).toHaveBeenCalledWith(
      `${mockHero.superhero} actualizado!`,
      'Hecho',
      { duration: 2500 }
    );
  });

  it('should handle delete hero', () => {
    component.heroForm.setValue(mockHero);
    component.onDeleteHero();
    expect(heroesService.deleteHeroById).toHaveBeenCalledWith(mockHero.id);
    expect(router.navigate).toHaveBeenCalledWith(['heroes']);
  });

  it('should not do anything if the URL does not contain "edit"', () => {
    const mockRouter = TestBed.inject(Router) as MockRouter;
    mockRouter.url = '/heroes/new';

    const spy = spyOn(heroesService, 'getHeroById').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should fetch hero data and reset form if the URL contains "edit" and hero is found', () => {
    const mockRouter = TestBed.inject(Router) as MockRouter;
    mockRouter.url = '/heroes/edit/1';
    spyOn(heroesService, 'getHeroById').and.returnValue(of(mockHero));

    component.ngOnInit();
    fixture.detectChanges();

    expect(heroesService.getHeroById).toHaveBeenCalledWith('1');
    expect(component.heroForm.value).toEqual(mockHero);
  });

  it('should redirect to the home page if the URL contains "edit" but no hero is found', () => {
    const mockRouter = TestBed.inject(Router) as MockRouter;
    mockRouter.url = '/heroes/edit/1';
    spyOn(heroesService, 'getHeroById').and.returnValue(of(null));

    component.ngOnInit();
    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should throw an error if the hero id is not provided', () => {
    Object.defineProperty(component, 'currentHero', {
      value: { ...mockHero, id: null },
      writable: true,
    });

    expect(() => component.onDeleteHero()).toThrowError(
      'El id del héroe es requerido'
    );
  });
});
