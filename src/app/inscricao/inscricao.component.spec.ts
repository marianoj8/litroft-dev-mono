import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoComponent } from './inscricao.component';

describe('InscricaoComponent', () => {
  let component: InscricaoComponent;
  let fixture: ComponentFixture<InscricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
