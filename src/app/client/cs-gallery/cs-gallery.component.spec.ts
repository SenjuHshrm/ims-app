import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsGalleryComponent } from './cs-gallery.component';

describe('CsGalleryComponent', () => {
  let component: CsGalleryComponent;
  let fixture: ComponentFixture<CsGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
