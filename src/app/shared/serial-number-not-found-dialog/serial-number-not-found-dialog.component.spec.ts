import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialNumberNotFoundDialogComponent } from './serial-number-not-found-dialog.component';

describe('SerialNumberNotFoundDialogComponent', () => {
  let component: SerialNumberNotFoundDialogComponent;
  let fixture: ComponentFixture<SerialNumberNotFoundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerialNumberNotFoundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialNumberNotFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
