import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfessorFormComponent } from './professor-form.component';

describe('ProfessorFormComponent', () => {
  let component: ProfessorFormComponent;
  let fixture: ComponentFixture<ProfessorFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
