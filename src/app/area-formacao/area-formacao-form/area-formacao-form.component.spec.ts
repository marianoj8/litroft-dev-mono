import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AreaFormacaoFormComponent } from './area-formacao-form.component';

describe('AreaFormacaoFormComponent', () => {
  let component: AreaFormacaoFormComponent;
  let fixture: ComponentFixture<AreaFormacaoFormComponent>;

  beforeEach(waitForAsync(() => {
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
