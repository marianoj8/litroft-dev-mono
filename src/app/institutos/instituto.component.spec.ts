import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutoComponent } from './instituto.component';

describe('InstitutoComponent', () => {
  let component: InstitutoComponent;
  let fixture: ComponentFixture<InstitutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
