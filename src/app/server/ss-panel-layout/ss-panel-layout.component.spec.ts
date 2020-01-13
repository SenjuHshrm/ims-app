import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsPanelLayoutComponent } from './ss-panel-layout.component';

describe('SsPanelLayoutComponent', () => {
  let component: SsPanelLayoutComponent;
  let fixture: ComponentFixture<SsPanelLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsPanelLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsPanelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
