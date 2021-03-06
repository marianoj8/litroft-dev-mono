import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjetoDetalheComponent } from './projeto-detalhe.component';

describe('ProjetoDetalheComponent', () => {
  let component: ProjetoDetalheComponent;
  let fixture: ComponentFixture<ProjetoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
