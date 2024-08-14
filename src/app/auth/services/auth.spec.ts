import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { User } from '../interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockUser: User = { id: 1, user: 'Marcos Parella' };
  const baseUrl = 'http://mockurl.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    service['baseUrl'] = baseUrl;
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentUser', () => {
    it('should return the current user if it is defined', () => {
      service['user'] = mockUser;

      const result = service.currentUser;

      expect(result).toEqual(mockUser);
    });

    it('should return undefined if no user is defined', () => {
      service['user'] = undefined;

      const result = service.currentUser;

      expect(result).toBeUndefined();
    });

    it('should return a new copy of the user object', () => {
      service['user'] = mockUser;

      const result = service.currentUser;

      expect(result).not.toBe(service['user']);
      expect(result).toEqual(service['user']);
    });
  });

  describe('checkAuthentication', () => {
    it('should return true if user is authenticated', () => {
      localStorage.setItem('token', 'adasdasdasd.asdasdasdas.sdasdasdasdasd');
      service.checkAuthentication().subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeTrue();
      });

      const req = httpMock.expectOne(`${baseUrl}/users/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser); // Simulate a successful response
    });

    it('should return false if token is not present', () => {
      localStorage.removeItem('token');
      service.checkAuthentication().subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeFalse();
      });
    });

    it('should return false if user request fails', () => {
      localStorage.setItem('token', 'adasdasdasd.asdasdasdas.sdasdasdasdasd');

      service.checkAuthentication().subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeFalse();
      });

      const req = httpMock.expectOne(`${baseUrl}/users/1`);
      expect(req.request.method).toBe('GET');
      req.flush('Error', { status: 500, statusText: 'Server Error' }); // Simulate an error response
    });
  });

  describe('logout', () => {
    it('should clear user and token', () => {
      service['user'] = mockUser;
      localStorage.setItem('token', 'adasdasdasd.asdasdasdas.sdasdasdasdasd');

      service.logout();

      expect(service.currentUser).toBeUndefined();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
