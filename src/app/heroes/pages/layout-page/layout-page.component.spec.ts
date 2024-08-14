import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

import { LayoutPageComponent } from './layout-page.component';

import { AuthService } from 'src/app/auth/services/auth.service';

import { User } from 'src/app/auth/interfaces/user.interface';

class MockAuthService {
  currentUser: User | undefined = { id: 1, user: 'Marcos Parella' };
  logout(): void {}
}

describe('LayoutPageComponent', () => {
  let component: LayoutPageComponent;
  let fixture: ComponentFixture<LayoutPageComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterModule.forRoot([]),
      ],
      declarations: [LayoutPageComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout and navigate to login on onLogout', () => {
    const authServiceSpy = spyOn(authService, 'logout').and.callThrough();

    component.onLogout();

    expect(authServiceSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should return the current user from AuthService', () => {
    const mockUser: User = { id: 1, user: 'Marcos Parella' };
    (authService as MockAuthService).currentUser = mockUser;

    expect(component.user).toEqual(mockUser);
  });
});
