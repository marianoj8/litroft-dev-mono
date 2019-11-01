import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoDetalheComponent } from './elemento-detalhe.component';

describe('ElementoDetalheComponent', () => {
  let component: ElementoDetalheComponent;
  let fixture: ComponentFixture<ElementoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
