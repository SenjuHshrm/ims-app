import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImgComponent } from './delete-img.component';

describe('DeleteImgComponent', () => {
  let component: DeleteImgComponent;
  let fixture: ComponentFixture<DeleteImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
