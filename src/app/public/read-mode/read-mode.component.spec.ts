import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReadModeComponent } from './read-mode.component';

describe('ReadModeComponent', () => {
  let component: ReadModeComponent;
  let fixture: ComponentFixture<ReadModeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
