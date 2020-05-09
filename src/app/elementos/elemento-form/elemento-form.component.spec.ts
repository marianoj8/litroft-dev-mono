import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoFormComponent } from './elemento-form.component';

describe('ElementoFormComponent', () => {
  let component: ElementoFormComponent;
  let fixture: ComponentFixture<ElementoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
