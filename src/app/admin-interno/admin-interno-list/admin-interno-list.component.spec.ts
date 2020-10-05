import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminInternoListComponent } from './admin-interno-list.component';

describe('AdminInternoListComponent', () => {
  let component: AdminInternoListComponent;
  let fixture: ComponentFixture<AdminInternoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInternoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
