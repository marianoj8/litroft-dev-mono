import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreOptionsDialogComponent } from './more-options-dialog.component';

describe('MoreOptionsDialogComponent', () => {
  let component: MoreOptionsDialogComponent;
  let fixture: ComponentFixture<MoreOptionsDialogComponent>;

  beforeEach(async(() => {
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
