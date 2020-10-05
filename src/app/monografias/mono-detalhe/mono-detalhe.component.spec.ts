import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonoDetalheComponent } from './mono-detalhe.component';

describe('MonoDetalheComponent', () => {
  let component: MonoDetalheComponent;
  let fixture: ComponentFixture<MonoDetalheComponent>;

  beforeEach(waitForAsync(() => {
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
