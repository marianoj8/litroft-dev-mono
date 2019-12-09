import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalFormComponent } from './local-form.component';

describe('LocalFormComponent', () => {
  let component: LocalFormComponent;
  let fixture: ComponentFixture<LocalFormComponent>;

  beforeEach(async(() => {
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
