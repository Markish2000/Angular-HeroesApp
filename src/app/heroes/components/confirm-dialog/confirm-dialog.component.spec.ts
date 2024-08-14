import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';

import { Hero, Publisher } from '../../interfaces/hero.interface';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const data: Hero = {
      id: '1',
      superhero: 'Superhero',
      alter_ego: 'Alter Ego',
      publisher: Publisher.DCComics,
      first_appearance: 'First Appearance',
      characters: 'Character1,Character2',
    };

    await TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<ConfirmDialogComponent>
    >;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with false when onNoClick is called', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true when onConfirm is called', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should receive MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual({
      id: '1',
      superhero: 'Superhero',
      alter_ego: 'Alter Ego',
      publisher: Publisher.DCComics,
      first_appearance: 'First Appearance',
      characters: 'Character1,Character2',
    });
  });
});
