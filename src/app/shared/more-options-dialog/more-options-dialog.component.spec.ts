import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoreOptionsDialogComponent } from './more-options-dialog.component';

describe('MoreOptionsDialogComponent', () => {
  let component: MoreOptionsDialogComponent;
  let fixture: ComponentFixture<MoreOptionsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreOptionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
