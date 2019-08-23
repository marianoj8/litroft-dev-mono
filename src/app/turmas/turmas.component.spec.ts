import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasComponent } from './turmas.component';

describe('TurmasComponent', () => {
  let component: TurmasComponent;
  let fixture: ComponentFixture<TurmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
