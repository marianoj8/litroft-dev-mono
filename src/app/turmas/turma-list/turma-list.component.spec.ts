import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaListComponent } from './turma-list.component';

describe('TurmaListComponent', () => {
  let component: TurmaListComponent;
  let fixture: ComponentFixture<TurmaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurmaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
