import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudanteDetalheComponent } from './estudante-detalhe.component';

describe('EstudanteDetalheComponent', () => {
  let component: EstudanteDetalheComponent;
  let fixture: ComponentFixture<EstudanteDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudanteDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudanteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
