import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientadoresComponent } from './orientadores.component';

describe('OrientadoresComponent', () => {
  let component: OrientadoresComponent;
  let fixture: ComponentFixture<OrientadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
