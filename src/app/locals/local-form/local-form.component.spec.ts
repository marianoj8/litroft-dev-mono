import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LocalFormComponent } from './local-form.component';

describe('LocalFormComponent', () => {
  let component: LocalFormComponent;
  let fixture: ComponentFixture<LocalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
