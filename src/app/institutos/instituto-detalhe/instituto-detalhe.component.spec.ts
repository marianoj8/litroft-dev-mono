import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutoDetalheComponent } from './instituto-detalhe.component';

describe('InstitutoDetalheComponent', () => {
  let component: InstitutoDetalheComponent;
  let fixture: ComponentFixture<InstitutoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
