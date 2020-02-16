import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsFooterComponent } from './cs-footer.component';

describe('CsFooterComponent', () => {
  let component: CsFooterComponent;
  let fixture: ComponentFixture<CsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
