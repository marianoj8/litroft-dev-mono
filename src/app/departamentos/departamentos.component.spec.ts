import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentosComponent } from './departamentos.component';

describe('DepartamentossComponent', () => {
  let component: DepartamentosComponent;
  let fixture: ComponentFixture<DepartamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
