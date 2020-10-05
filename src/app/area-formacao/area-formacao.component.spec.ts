import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AreaFormacaoComponent } from './area-formacao.component';

describe('AreaFormacaoComponent', () => {
  let component: AreaFormacaoComponent;
  let fixture: ComponentFixture<AreaFormacaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaFormacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFormacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
