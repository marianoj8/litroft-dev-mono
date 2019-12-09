import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeFormComponent } from './especialidade-form.component';

describe('EspecialidadeFormComponent', () => {
  let component: EspecialidadeFormComponent;
  let fixture: ComponentFixture<EspecialidadeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
