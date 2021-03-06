import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InscricaoOptionsComponent } from './inscricao-options.component';

describe('InscricaoOptionsComponent', () => {
  let component: InscricaoOptionsComponent;
  let fixture: ComponentFixture<InscricaoOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
