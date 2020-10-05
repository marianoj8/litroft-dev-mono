import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListAllComponent } from './list-all.component';

describe('ListAllComponent', () => {
  let component: ListAllComponent;
  let fixture: ComponentFixture<ListAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
