import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaDetalheComponent } from './turma-detalhe.component';

describe('TurmaDetalheComponent', () => {
  let component: TurmaDetalheComponent;
  let fixture: ComponentFixture<TurmaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
