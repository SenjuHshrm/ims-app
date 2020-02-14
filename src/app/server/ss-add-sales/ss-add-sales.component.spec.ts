import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsAddSalesComponent } from './ss-add-sales.component';

describe('SsAddSalesComponent', () => {
  let component: SsAddSalesComponent;
  let fixture: ComponentFixture<SsAddSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsAddSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsAddSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
