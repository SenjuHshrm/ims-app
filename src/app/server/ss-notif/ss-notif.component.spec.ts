import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsNotifComponent } from './ss-notif.component';

describe('SsNotifComponent', () => {
  let component: SsNotifComponent;
  let fixture: ComponentFixture<SsNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
