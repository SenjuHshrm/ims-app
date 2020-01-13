import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsHomeComponent } from './cs-home.component';

describe('CsHomeComponent', () => {
  let component: CsHomeComponent;
  let fixture: ComponentFixture<CsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
