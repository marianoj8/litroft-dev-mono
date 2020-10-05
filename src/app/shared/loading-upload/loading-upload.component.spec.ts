import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadingUploadComponent } from './loading-upload.component';

describe('LoadingUploadComponent', () => {
  let component: LoadingUploadComponent;
  let fixture: ComponentFixture<LoadingUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
