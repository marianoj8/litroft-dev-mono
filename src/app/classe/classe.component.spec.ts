import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseComponent } from './classe.component';

describe('ClasseComponent', () => {
  let component: ClasseComponent;
  let fixture: ComponentFixture<ClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
