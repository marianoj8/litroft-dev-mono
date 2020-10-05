import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminInternoFormComponent } from './admin-interno-form.component';

describe('AdminInternoFormComponent', () => {
  let component: AdminInternoFormComponent;
  let fixture: ComponentFixture<AdminInternoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInternoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
