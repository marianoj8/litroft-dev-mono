import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CursoFormComponent } from './curso-form.component';

describe('CursoFormComponent', () => {
  let component: CursoFormComponent;
  let fixture: ComponentFixture<CursoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
