import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstitutoListComponent } from './instituto-list.component';

describe('InstitutoListComponent', () => {
  let component: InstitutoListComponent;
  let fixture: ComponentFixture<InstitutoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
