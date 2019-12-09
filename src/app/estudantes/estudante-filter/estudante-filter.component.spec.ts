import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudanteFilterComponent } from './estudante-filter.component';

describe('EstudanteFilterComponent', () => {
  let component: EstudanteFilterComponent;
  let fixture: ComponentFixture<EstudanteFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudanteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudanteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
