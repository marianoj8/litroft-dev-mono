import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutoNivelComponent } from './instituto-nivel.component';

describe('InstitutoNivelComponent', () => {
  let component: InstitutoNivelComponent;
  let fixture: ComponentFixture<InstitutoNivelComponent>;

  beforeEach(async(() => {
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
