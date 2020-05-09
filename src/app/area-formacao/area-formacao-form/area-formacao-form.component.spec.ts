import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFormacaoFormComponent } from './area-formacao-form.component';

describe('AreaFormacaoFormComponent', () => {
  let component: AreaFormacaoFormComponent;
  let fixture: ComponentFixture<AreaFormacaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaFormacaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFormacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
