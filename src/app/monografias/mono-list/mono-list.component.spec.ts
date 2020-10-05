import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonoListComponent } from './mono-list.component';

describe('MonoListComponent', () => {
  let component: MonoListComponent;
  let fixture: ComponentFixture<MonoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
