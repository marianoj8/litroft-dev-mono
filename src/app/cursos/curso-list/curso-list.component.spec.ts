import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CursoListComponent } from './curso-list.component';

describe('CursoListComponent', () => {
  let component: CursoListComponent;
  let fixture: ComponentFixture<CursoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
