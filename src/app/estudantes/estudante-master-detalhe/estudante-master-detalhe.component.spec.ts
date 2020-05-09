import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudanteMasterDetalheComponent } from './estudante-master-detalhe.component';

describe('EstudanteMasterDetalheComponent', () => {
  let component: EstudanteMasterDetalheComponent;
  let fixture: ComponentFixture<EstudanteMasterDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudanteMasterDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudanteMasterDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
