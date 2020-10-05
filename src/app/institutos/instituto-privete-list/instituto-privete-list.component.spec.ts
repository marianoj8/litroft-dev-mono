import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstitutoPriveteListComponent } from './instituto-privete-list.component';

describe('InstitutoPriveteListComponent', () => {
  let component: InstitutoPriveteListComponent;
  let fixture: ComponentFixture<InstitutoPriveteListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutoPriveteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutoPriveteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
