import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGlimageComponent } from './view-glimage.component';

describe('ViewGlimageComponent', () => {
  let component: ViewGlimageComponent;
  let fixture: ComponentFixture<ViewGlimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGlimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGlimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
