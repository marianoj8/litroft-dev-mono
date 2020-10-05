import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EstudanteFromComponent } from './estudante-from.component';

describe('EstudanteFromComponent', () => {
  let component: EstudanteFromComponent;
  let fixture: ComponentFixture<EstudanteFromComponent>;

  beforeEach(waitForAsync(() => {
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
