import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctListComponent } from './acct-list.component';

describe('AcctListComponent', () => {
  let component: AcctListComponent;
  let fixture: ComponentFixture<AcctListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcctListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
