import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InscricaoFormComponent } from './inscricao-form.component';

describe('InscricaoFormComponent', () => {
  let component: InscricaoFormComponent;
  let fixture: ComponentFixture<InscricaoFormComponent>;

  beforeEach(waitForAsync(() => {
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
