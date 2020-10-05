import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstitutoDetalheComponent } from './instituto-detalhe.component';

describe('InstitutoDetalheComponent', () => {
  let component: InstitutoDetalheComponent;
  let fixture: ComponentFixture<InstitutoDetalheComponent>;

  beforeEach(waitForAsync(() => {
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
