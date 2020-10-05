import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DepartamentoDetalheComponent } from './departamento-detalhe.component';

describe('DepartamentoDetalheComponent', () => {
  let component: DepartamentoDetalheComponent;
  let fixture: ComponentFixture<DepartamentoDetalheComponent>;

  beforeEach(waitForAsync(() => {
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
