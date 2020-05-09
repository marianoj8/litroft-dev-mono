import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosComponent } from './periodos.component';

describe('PeriodosComponent', () => {
  let component: PeriodosComponent;
  let fixture: ComponentFixture<PeriodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
