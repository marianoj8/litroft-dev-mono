import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientadorFormComponent } from './orientador-form.component';

describe('OrientadorFormComponent', () => {
  let component: OrientadorFormComponent;
  let fixture: ComponentFixture<OrientadorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientadorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
