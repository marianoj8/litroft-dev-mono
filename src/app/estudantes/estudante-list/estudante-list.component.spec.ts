import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EstudanteListComponent } from './estudante-list.component';

describe('EstudanteListComponent', () => {
  let component: EstudanteListComponent;
  let fixture: ComponentFixture<EstudanteListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudanteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudanteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
