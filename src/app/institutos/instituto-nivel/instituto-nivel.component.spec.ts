import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstitutoNivelComponent } from './instituto-nivel.component';

describe('InstitutoNivelComponent', () => {
  let component: InstitutoNivelComponent;
  let fixture: ComponentFixture<InstitutoNivelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutoNivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
