import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoListComponent } from './grupo-list.component';

describe('GrupoListComponent', () => {
  let component: GrupoListComponent;
  let fixture: ComponentFixture<GrupoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
