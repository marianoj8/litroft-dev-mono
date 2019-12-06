import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonoDetalheComponent } from './mono-detalhe.component';

describe('MonoDetalheComponent', () => {
  let component: MonoDetalheComponent;
  let fixture: ComponentFixture<MonoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
