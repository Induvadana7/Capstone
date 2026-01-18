import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealCreateComponent } from './deal-create.component';
import { DealService } from '../../services/deal.service';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DealCreateComponent', () => {
  let component: DealCreateComponent;
  let fixture: ComponentFixture<DealCreateComponent>;

  const dealServiceMock = {
    createDeal: jasmine.createSpy('createDeal')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealCreateComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: DealService, useValue: dealServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DealCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dealServiceMock.createDeal.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form invalid', () => {
    component.form.reset(); // invalid
    component.submit();

    expect(dealServiceMock.createDeal).not.toHaveBeenCalled();
  });

  it('should create deal and navigate to /deals', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    dealServiceMock.createDeal.and.returnValue(of({} as any));

    component.form.setValue({
      clientName: 'Test Client',
      dealType: 'IPO',
      sector: 'IT',
      summary: 'Test summary',
      currentStage: 'Prospect'
    });

    component.submit();

    expect(dealServiceMock.createDeal).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/deals');
  });
});
