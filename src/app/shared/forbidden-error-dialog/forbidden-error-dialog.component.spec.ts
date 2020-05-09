import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenErrorDialogComponent } from './forbidden-error-dialog.component';

describe('ForbiddenErrorDialogComponent', () => {
  let component: ForbiddenErrorDialogComponent;
  let fixture: ComponentFixture<ForbiddenErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForbiddenErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForbiddenErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
