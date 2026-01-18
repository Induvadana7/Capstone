import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealDetailComponent } from './deal-detail.component';
import { DealService } from '../../services/deal.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DealDetailComponent', () => {
  let component: DealDetailComponent;
  let fixture: ComponentFixture<DealDetailComponent>;

  let dealServiceSpy: jasmine.SpyObj<DealService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockDeal: any = {
    _id: '1',
    clientName: 'Acme Capital',
    dealType: 'M&A',
    sector: 'Manufacturing',
    summary: 'Test summary',
    currentStage: 'Prospect',
    dealValue: 300000000,
    notes: []
  };

  beforeEach(async () => {
    dealServiceSpy = jasmine.createSpyObj('DealService', [
      'getDealById',
      'updateStage',
      'addNote',
      'updateDeal',
      'updateDealValue',
      'deleteDeal'
    ]);

    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        DealDetailComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: DealService, useValue: dealServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DealDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should load deal on init', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));

    fixture.detectChanges();

    expect(dealServiceSpy.getDealById).toHaveBeenCalledWith('1');
    expect(component.deal.clientName).toBe('Acme Capital');
  });

  it('should update stage', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));
    dealServiceSpy.updateStage.and.returnValue(of(mockDeal));

    fixture.detectChanges();

    component.onStageChange('Closed');

    expect(dealServiceSpy.updateStage).toHaveBeenCalledWith('1', 'Closed');
  });

  it('should handle stage update error', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));
    dealServiceSpy.updateStage.and.returnValue(throwError(() => new Error('fail')));

    spyOn(window, 'alert');

    fixture.detectChanges();

    component.onStageChange('Lost');

    expect(window.alert).toHaveBeenCalled();
  });

  it('should add note', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));
    dealServiceSpy.addNote.and.returnValue(of(mockDeal));

    fixture.detectChanges();

    component.noteInput = 'Test note';
    component.onAddNote();

    expect(dealServiceSpy.addNote).toHaveBeenCalledWith('1', 'Test note');
  });

  it('should not add empty note', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));

    spyOn(window, 'alert');

    fixture.detectChanges();

    component.noteInput = '   ';
    component.onAddNote();

    expect(dealServiceSpy.addNote).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should save basic deal fields (PUT)', () => {
    authServiceSpy.isAdmin.and.returnValue(false);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));
    dealServiceSpy.updateDeal.and.returnValue(of(mockDeal));

    spyOn(window, 'alert');

    fixture.detectChanges();

    component.editDealType = 'IPO';
    component.editSector = 'IT';
    component.editSummary = 'Updated summary';

    component.onSaveBasicDetails();

    expect(dealServiceSpy.updateDeal).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should update deal value when admin', () => {
    authServiceSpy.isAdmin.and.returnValue(true);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));
    dealServiceSpy.updateDealValue.and.returnValue(of(mockDeal));

    spyOn(window, 'alert');

    fixture.detectChanges();

    component.dealValueInput = 500000000;
    component.onUpdateDealValue();

    expect(dealServiceSpy.updateDealValue).toHaveBeenCalledWith('1', 500000000);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should delete deal when admin confirmed', () => {
    authServiceSpy.isAdmin.and.returnValue(true);
    dealServiceSpy.getDealById.and.returnValue(of(mockDeal));
    dealServiceSpy.deleteDeal.and.returnValue(of(void 0));

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');

    fixture.detectChanges();

    component.onDeleteDeal();

    expect(dealServiceSpy.deleteDeal).toHaveBeenCalledWith('1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/deals']);
  });
});

