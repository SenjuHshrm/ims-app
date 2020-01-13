import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsSalesReportComponent } from './ss-sales-report.component';

describe('SsSalesReportComponent', () => {
  let component: SsSalesReportComponent;
  let fixture: ComponentFixture<SsSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
