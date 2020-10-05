import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrientadorListComponent } from './orientador-list.component';

describe('OrientadorListComponent', () => {
  let component: OrientadorListComponent;
  let fixture: ComponentFixture<OrientadorListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientadorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
