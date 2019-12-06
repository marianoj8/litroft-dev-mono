import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingUploadComponent } from './loading-upload.component';

describe('LoadingUploadComponent', () => {
  let component: LoadingUploadComponent;
  let fixture: ComponentFixture<LoadingUploadComponent>;

  beforeEach(async(() => {
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
