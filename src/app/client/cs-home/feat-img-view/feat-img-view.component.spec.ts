import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatImgViewComponent } from './feat-img-view.component';

describe('FeatImgViewComponent', () => {
  let component: FeatImgViewComponent;
  let fixture: ComponentFixture<FeatImgViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatImgViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatImgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
