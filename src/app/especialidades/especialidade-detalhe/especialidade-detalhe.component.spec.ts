import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EspecialidadeDetalheComponent } from './especialidade-detalhe.component';

describe('EspecialidadeDetalheComponent', () => {
  let component: EspecialidadeDetalheComponent;
  let fixture: ComponentFixture<EspecialidadeDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadeDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
