import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsItemsComponent } from './ss-items.component';

describe('SsItemsComponent', () => {
  let component: SsItemsComponent;
  let fixture: ComponentFixture<SsItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
