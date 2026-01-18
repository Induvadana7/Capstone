import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token/role/username', () => {
    const fakeToken =
      'eyJhbGciOiJIUzI1NiJ9.' +
      btoa(JSON.stringify({ role: 'ADMIN', sub: 'admin' })) +
      '.signature';

    service.login({ username: 'admin', password: 'admin123' } as any).subscribe((res) => {
      expect(res.token).toBe(fakeToken);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/auth/login`);
    expect(req.request.method).toBe('POST');

    req.flush({ token: fakeToken });

    // token stored
    expect(service.getToken()).toBe(fakeToken);
    expect(service.isLoggedIn()).toBeTrue();

    // role + username from jwt claim
    expect(service.getRole()).toBe('ADMIN');
    expect(service.isAdmin()).toBeTrue();
    expect(service.getUsername()).toBe('admin');
  });

  it('should logout and clear storage', () => {
    localStorage.setItem('jwt_token', 'x');
    localStorage.setItem('user_role', 'ADMIN');
    localStorage.setItem('username', 'admin');

    service.logout();

    expect(service.getToken()).toBeNull();
    expect(service.getRole()).toBeNull();
    expect(service.getUsername()).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return false for isAdmin when role is USER', () => {
    localStorage.setItem('user_role', 'USER');
    expect(service.isAdmin()).toBeFalse();
  });

  it('should handle invalid token decode safely', () => {
    // login with invalid token format
    service.login({ username: 'x', password: 'y' } as any).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/auth/login`);
    req.flush({ token: 'invalid.token.value' });

    // should not crash
    expect(service.isLoggedIn()).toBeTrue();
  });
});
