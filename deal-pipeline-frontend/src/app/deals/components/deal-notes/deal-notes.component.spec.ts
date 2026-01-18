import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealNotesComponent } from './deal-notes.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DealNotesComponent', () => {
  let component: DealNotesComponent;
  let fixture: ComponentFixture<DealNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealNotesComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DealNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
