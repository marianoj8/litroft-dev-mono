import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorLoadingComponent } from './error-loading.component';

describe('ErrorLoadingComponent', () => {
  let component: ErrorLoadingComponent;
  let fixture: ComponentFixture<ErrorLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
