import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsAdminlayoutComponent } from './ss-adminlayout.component';

describe('SsAdminlayoutComponent', () => {
  let component: SsAdminlayoutComponent;
  let fixture: ComponentFixture<SsAdminlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsAdminlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsAdminlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
