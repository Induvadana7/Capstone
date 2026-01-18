import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealEditComponent } from './deal-edit.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DealEditComponent', () => {
  let component: DealEditComponent;
  let fixture: ComponentFixture<DealEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealEditComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DealEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

