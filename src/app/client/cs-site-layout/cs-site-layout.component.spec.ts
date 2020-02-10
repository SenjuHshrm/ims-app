import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsSiteLayoutComponent } from './cs-site-layout.component';

describe('CsSiteLayoutComponent', () => {
  let component: CsSiteLayoutComponent;
  let fixture: ComponentFixture<CsSiteLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsSiteLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsSiteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
