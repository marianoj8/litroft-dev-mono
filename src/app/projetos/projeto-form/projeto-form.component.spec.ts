import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjetoFormComponent } from './projeto-form.component';

describe('ProjetoFormComponent', () => {
  let component: ProjetoFormComponent;
  let fixture: ComponentFixture<ProjetoFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
