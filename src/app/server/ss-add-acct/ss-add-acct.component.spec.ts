import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsAddAcctComponent } from './ss-add-acct.component';

describe('SsAddAcctComponent', () => {
  let component: SsAddAcctComponent;
  let fixture: ComponentFixture<SsAddAcctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsAddAcctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsAddAcctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
