import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfessorDetalheComponent } from './professor-detalhe.component';

describe('ProfessorDetalheComponent', () => {
  let component: ProfessorDetalheComponent;
  let fixture: ComponentFixture<ProfessorDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
