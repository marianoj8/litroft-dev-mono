import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoDetalheComponent } from './departamento-detalhe.component';

describe('DepartamentoDetalheComponent', () => {
  let component: DepartamentoDetalheComponent;
  let fixture: ComponentFixture<DepartamentoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
