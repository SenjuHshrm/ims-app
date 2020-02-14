import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsReceiveItemComponent } from './ss-receive-item.component';

describe('SsReceiveItemComponent', () => {
  let component: SsReceiveItemComponent;
  let fixture: ComponentFixture<SsReceiveItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsReceiveItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsReceiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
