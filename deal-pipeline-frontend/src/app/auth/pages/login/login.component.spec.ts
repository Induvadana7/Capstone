import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../shared/services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceMock = {
    login: jasmine.createSpy('login'),
  };

  const routerMock = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // ✅ Important: clear call history for each test
    authServiceMock.login.calls.reset();
    routerMock.navigateByUrl.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when form invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });

    component.loginForm.markAllAsTouched();
    component.loginForm.updateValueAndValidity();

    component.onSubmit();

    expect(authServiceMock.login).not.toHaveBeenCalled();
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should login success and navigate to deals', () => {
    authServiceMock.login.and.returnValue(of({ token: 'abc' } as any));

    component.loginForm.setValue({ username: 'admin', password: '1234' });
    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/deals');
  });

  it('should handle login failure', () => {
    authServiceMock.login.and.returnValue(throwError(() => new Error('fail')));

    component.loginForm.setValue({ username: 'x', password: 'y' });
    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalled();
  });
});


