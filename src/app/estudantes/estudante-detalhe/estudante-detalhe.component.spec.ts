import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EstudanteDetalheComponent } from './estudante-detalhe.component';

describe('EstudanteDetalheComponent', () => {
  let component: EstudanteDetalheComponent;
  let fixture: ComponentFixture<EstudanteDetalheComponent>;

  beforeEach(waitForAsync(() => {
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
