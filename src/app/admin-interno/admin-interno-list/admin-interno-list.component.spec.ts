import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternoListComponent } from './admin-interno-list.component';

describe('AdminInternoListComponent', () => {
  let component: AdminInternoListComponent;
  let fixture: ComponentFixture<AdminInternoListComponent>;

  beforeEach(async(() => {
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
