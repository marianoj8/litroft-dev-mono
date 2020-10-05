import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminInternoComponent } from './admin-interno.component';

describe('AdminInternoComponent', () => {
  let component: AdminInternoComponent;
  let fixture: ComponentFixture<AdminInternoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
