import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealListComponent } from './deal-list.component';
import { DealService } from '../../services/deal.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Angular Material & Forms
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DealListComponent', () => {
  let component: DealListComponent;
  let fixture: ComponentFixture<DealListComponent>;

  let dealServiceSpy: jasmine.SpyObj<DealService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockDeals: any[] = [
    {
      _id: '1',
      clientName: 'Acme Capital',
      dealType: 'M&A',
      sector: 'Manufacturing',
      summary: 'Test summary',
      currentStage: 'Prospect',
      createdAt: new Date().toISOString(),
      createdBy: 'admin',
      notes: [{ note: 'Initial note' }],
      dealValue: 300000000
    },
    {
      _id: '2',
      clientName: 'TechNova Pvt Ltd',
      dealType: 'IPO',
      sector: 'IT',
      summary: 'Company planning IPO',
      currentStage: 'UnderEvaluation',
      createdAt: new Date().toISOString(),
      createdBy: 'admin',
      notes: [],
      dealValue: 100000000
    }
  ];

  beforeEach(async () => {
    dealServiceSpy = jasmine.createSpyObj('DealService', ['getDeals', 'deleteDeal']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        // ✅ standalone component needs imports directly
        DealListComponent,

        // but also ensure these are available
        CommonModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: DealService, useValue: dealServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DealListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDeals.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load deals on init', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDeals.and.returnValue(of(mockDeals as any));
    fixture.detectChanges();

    expect(dealServiceSpy.getDeals).toHaveBeenCalled();
    expect(component.deals.length).toBe(2);
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should include dealValue column when admin', () => {
    authServiceSpy.isAdmin.and.returnValue(true);
    dealServiceSpy.getDeals.and.returnValue(of(mockDeals as any));
    fixture.detectChanges();

    expect(component.isAdmin).toBeTrue();
    expect(component.displayedColumns).toContain('dealValue');
  });

  it('should NOT include dealValue column when user', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDeals.and.returnValue(of(mockDeals as any));
    fixture.detectChanges();

    expect(component.isAdmin).toBeFalse();
    expect(component.displayedColumns).not.toContain('dealValue');
  });

  it('should navigate to create deal page', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDeals.and.returnValue(of([]));
    fixture.detectChanges();

    component.onCreateDeal();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/deals/create']);
  });

  it('should navigate to deal detail on view', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDeals.and.returnValue(of([]));
    fixture.detectChanges();

    component.onViewDeal(mockDeals[0] as any);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should not delete deal when not admin', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDeals.and.returnValue(of(mockDeals as any));
    fixture.detectChanges();

    component.onDeleteDeal(mockDeals[0] as any);

    expect(dealServiceSpy.deleteDeal).not.toHaveBeenCalled();
  });

  it('should delete deal when admin and confirmed', () => {
    authServiceSpy.isAdmin.and.returnValue(true);
    dealServiceSpy.getDeals.and.returnValue(of(mockDeals as any));
    dealServiceSpy.deleteDeal.and.returnValue(of(void 0));

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');

    fixture.detectChanges();

    component.onDeleteDeal(mockDeals[0] as any);

    expect(dealServiceSpy.deleteDeal).toHaveBeenCalled();
  });

  it('should handle delete error', () => {
    authServiceSpy.isAdmin.and.returnValue(true);
    dealServiceSpy.getDeals.and.returnValue(of(mockDeals as any));
    dealServiceSpy.deleteDeal.and.returnValue(throwError(() => new Error('fail')));

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');

    fixture.detectChanges();

    component.onDeleteDeal(mockDeals[0] as any);

    expect(window.alert).toHaveBeenCalled();
  });
});

