import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadModeComponent } from './read-mode.component';

describe('ReadModeComponent', () => {
  let component: ReadModeComponent;
  let fixture: ComponentFixture<ReadModeComponent>;

  beforeEach(async(() => {
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
