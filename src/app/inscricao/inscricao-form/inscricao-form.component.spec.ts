import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoFormComponent } from './inscricao-form.component';

describe('InscricaoFormComponent', () => {
  let component: InscricaoFormComponent;
  let fixture: ComponentFixture<InscricaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
