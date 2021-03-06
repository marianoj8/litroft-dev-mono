import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrupoDetalheComponent } from './grupo-detalhe.component';

describe('GrupoDetalheComponent', () => {
  let component: GrupoDetalheComponent;
  let fixture: ComponentFixture<GrupoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
