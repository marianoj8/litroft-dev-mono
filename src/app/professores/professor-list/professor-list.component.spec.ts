import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfessorListComponent } from './professor-list.component';

describe('ProfessorListComponent', () => {
  let component: ProfessorListComponent;
  let fixture: ComponentFixture<ProfessorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
