import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsHomeComponent } from './ss-home.component';

describe('SsHomeComponent', () => {
  let component: SsHomeComponent;
  let fixture: ComponentFixture<SsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
