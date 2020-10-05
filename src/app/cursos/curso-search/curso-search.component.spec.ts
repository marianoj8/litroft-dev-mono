import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CursoSearchComponent } from './curso-search.component';

describe('CursoSearchComponent', () => {
  let component: CursoSearchComponent;
  let fixture: ComponentFixture<CursoSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
