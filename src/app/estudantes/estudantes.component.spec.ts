import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudantesComponent } from './estudantes.component';

describe('EstudantesComponent', () => {
  let component: EstudantesComponent;
  let fixture: ComponentFixture<EstudantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
