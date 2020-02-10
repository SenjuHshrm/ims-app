import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsServicesComponent } from './cs-services.component';

describe('CsServicesComponent', () => {
  let component: CsServicesComponent;
  let fixture: ComponentFixture<CsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
