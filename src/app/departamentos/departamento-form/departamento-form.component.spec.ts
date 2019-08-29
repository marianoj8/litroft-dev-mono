import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoFormComponent } from './departamento-form.component';

describe('DepartamentoFormComponent', () => {
  let component: DepartamentoFormComponent;
  let fixture: ComponentFixture<DepartamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
