import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoInfoComponent } from './inscricao-info.component';

describe('InscricaoInfoComponent', () => {
  let component: InscricaoInfoComponent;
  let fixture: ComponentFixture<InscricaoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscricaoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
