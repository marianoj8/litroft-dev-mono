import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatriculaOpcaoComponent } from './matricula-opcao.component';

describe('MatriculaOpcaoComponent', () => {
  let component: MatriculaOpcaoComponent;
  let fixture: ComponentFixture<MatriculaOpcaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculaOpcaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculaOpcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
