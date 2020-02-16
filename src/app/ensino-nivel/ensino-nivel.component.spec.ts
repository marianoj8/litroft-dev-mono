import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsinoNivelComponent } from './ensino-nivel.component';

describe('EnsinoNivelComponent', () => {
  let component: EnsinoNivelComponent;
  let fixture: ComponentFixture<EnsinoNivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsinoNivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsinoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
