import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcctInfoComponent } from './update-acct-info.component';

describe('UpdateAcctInfoComponent', () => {
  let component: UpdateAcctInfoComponent;
  let fixture: ComponentFixture<UpdateAcctInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAcctInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAcctInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
