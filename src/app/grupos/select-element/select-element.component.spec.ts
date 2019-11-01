import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectElementComponent } from './select-element.component';

describe('SelectElementComponent', () => {
  let component: SelectElementComponent;
  let fixture: ComponentFixture<SelectElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
