import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DepartamentoListComponent } from './departamento-list.component';

describe('DepartamentoListComponent', () => {
  let component: DepartamentoListComponent;
  let fixture: ComponentFixture<DepartamentoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartamentoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
