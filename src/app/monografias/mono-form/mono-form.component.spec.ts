import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonoFormComponent } from './mono-form.component';

describe('MonoFormComponent', () => {
  let component: MonoFormComponent;
  let fixture: ComponentFixture<MonoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
