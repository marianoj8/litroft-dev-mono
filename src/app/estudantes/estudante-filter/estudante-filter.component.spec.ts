import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EstudanteFilterComponent } from './estudante-filter.component';

describe('EstudanteFilterComponent', () => {
  let component: EstudanteFilterComponent;
  let fixture: ComponentFixture<EstudanteFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudanteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudanteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
