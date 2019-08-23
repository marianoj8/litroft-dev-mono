import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudanteFromComponent } from './estudante-from.component';

describe('EstudanteFromComponent', () => {
  let component: EstudanteFromComponent;
  let fixture: ComponentFixture<EstudanteFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudanteFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudanteFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
