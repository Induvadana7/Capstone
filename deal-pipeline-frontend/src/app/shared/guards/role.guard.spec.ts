import { TestBed } from '@angular/core/testing';
import { roleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('roleGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const routeMock = {} as ActivatedRouteSnapshot;
  const stateMock = { url: '/admin' } as RouterStateSnapshot;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['getRole']);
    router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should allow access when role is ADMIN', () => {
    authService.getRole.and.returnValue('ADMIN');

    const result = TestBed.runInInjectionContext(() => roleGuard(routeMock, stateMock));

    expect(result).toBeTrue();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should block access when role is USER', () => {
    authService.getRole.and.returnValue('USER');

    const result = TestBed.runInInjectionContext(() => roleGuard(routeMock, stateMock));

    expect(result).toBeFalse();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/deals');
  });
});
