import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutoFormComponent } from './instituto-form.component';

describe('InstitutoFormComponent', () => {
  let component: InstitutoFormComponent;
  let fixture: ComponentFixture<InstitutoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
