import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoFormComponent } from './grupo-form.component';

describe('GrupoFormComponent', () => {
  let component: GrupoFormComponent;
  let fixture: ComponentFixture<GrupoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
