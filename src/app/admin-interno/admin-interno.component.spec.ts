import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternoComponent } from './admin-interno.component';

describe('AdminInternoComponent', () => {
  let component: AdminInternoComponent;
  let fixture: ComponentFixture<AdminInternoComponent>;

  beforeEach(async(() => {
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
