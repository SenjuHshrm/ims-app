import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsDailySalesComponent } from './ss-daily-sales.component';

describe('SsDailySalesComponent', () => {
  let component: SsDailySalesComponent;
  let fixture: ComponentFixture<SsDailySalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsDailySalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsDailySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
