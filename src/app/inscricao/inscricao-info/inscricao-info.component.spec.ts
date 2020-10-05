import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InscricaoInfoComponent } from './inscricao-info.component';

describe('InscricaoInfoComponent', () => {
  let component: InscricaoInfoComponent;
  let fixture: ComponentFixture<InscricaoInfoComponent>;

  beforeEach(waitForAsync(() => {
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
