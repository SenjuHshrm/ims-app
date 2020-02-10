import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsNavComponent } from './cs-nav.component';

describe('CsNavComponent', () => {
  let component: CsNavComponent;
  let fixture: ComponentFixture<CsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
