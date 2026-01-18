import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealAdminActionsComponent } from './deal-admin-actions.component';

describe('DealAdminActionsComponent', () => {
  let component: DealAdminActionsComponent;
  let fixture: ComponentFixture<DealAdminActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealAdminActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealAdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
