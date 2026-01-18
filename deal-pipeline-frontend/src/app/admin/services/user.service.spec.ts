import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.apiBaseUrl}/api/admin/users`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user', () => {
    const payload: any = {
      username: 'test.user',
      email: 'test@bank.com',
      password: 'pass123',
      role: 'USER'
    };

    service.createUser(payload).subscribe((res: any) => {
      expect(res).toBeTruthy();
      expect(res.username).toBe('test.user');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.username).toBe('test.user');

    req.flush({ id: '1', username: 'test.user' });
  });

  it('should get users list', () => {
    service.getUsers().subscribe((res: any[]) => {
      expect(res.length).toBe(2);
      expect(res[0].username).toBe('admin');
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');

    req.flush([
      { id: '1', username: 'admin', role: 'ADMIN', active: true },
      { id: '2', username: 'user1', role: 'USER', active: true }
    ]);
  });

  it('should update user status', () => {
    const id = '123';
    const active = false;

    service.updateUserStatus(id, active).subscribe((res: any) => {
      expect(res).toBeTruthy();
      expect(res.active).toBe(false);
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}/status?active=${active}`);
    expect(req.request.method).toBe('PUT');

    req.flush({ id, active: false });
  });
});
