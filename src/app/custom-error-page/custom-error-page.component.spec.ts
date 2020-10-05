import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomErrorPageComponent } from './custom-error-page.component';

describe('CustomErrorPageComponent', () => {
  let component: CustomErrorPageComponent;
  let fixture: ComponentFixture<CustomErrorPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
