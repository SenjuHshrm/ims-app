import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsProductsComponent } from './cs-products.component';

describe('CsProductsComponent', () => {
  let component: CsProductsComponent;
  let fixture: ComponentFixture<CsProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
