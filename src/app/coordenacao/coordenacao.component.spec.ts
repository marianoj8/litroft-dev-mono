import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordenacaoComponent } from './coordenacao.component';

describe('CoordenacaoComponent', () => {
  let component: CoordenacaoComponent;
  let fixture: ComponentFixture<CoordenacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordenacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
