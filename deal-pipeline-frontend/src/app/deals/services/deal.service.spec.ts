import { TestBed } from '@angular/core/testing';
import { DealService } from './deal.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('DealService', () => {
  let service: DealService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.apiBaseUrl}/api/deals`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DealService]
    });

    service = TestBed.inject(DealService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET deals with filters', () => {
    service.getDeals({ stage: 'Prospect', sector: 'IT', dealType: 'IPO' }).subscribe();

    const req = httpMock.expectOne((r) =>
      r.method === 'GET' &&
      r.url === baseUrl &&
      r.params.get('stage') === 'Prospect' &&
      r.params.get('sector') === 'IT' &&
      r.params.get('dealType') === 'IPO'
    );

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call GET deal by id', () => {
    service.getDealById('1').subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call POST create deal', () => {
    service.createDeal({ clientName: 'X' } as any).subscribe();

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call PUT update deal', () => {
    service.updateDeal('1', { summary: 'Updated' } as any).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should call PATCH update stage', () => {
    service.updateStage('1', 'Closed').subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1/stage`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ stage: 'Closed' });
    req.flush({});
  });

  it('should call POST add note', () => {
    service.addNote('1', 'Hello').subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1/notes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ note: 'Hello' });
    req.flush({});
  });

  it('should call PATCH update deal value (admin)', () => {
    service.updateDealValue('1', 1000).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1/value`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ dealValue: 1000 });
    req.flush({});
  });

  it('should call DELETE deal (admin)', () => {
    service.deleteDeal('1').subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
