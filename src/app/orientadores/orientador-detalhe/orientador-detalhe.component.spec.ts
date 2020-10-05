import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrientadorDetalheComponent } from './orientador-detalhe.component';

describe('OrientadorDetalheComponent', () => {
  let component: OrientadorDetalheComponent;
  let fixture: ComponentFixture<OrientadorDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientadorDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientadorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
