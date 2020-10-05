import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TurmaFormComponent } from './turma-form.component';

describe('TurmaFormComponent', () => {
  let component: TurmaFormComponent;
  let fixture: ComponentFixture<TurmaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
