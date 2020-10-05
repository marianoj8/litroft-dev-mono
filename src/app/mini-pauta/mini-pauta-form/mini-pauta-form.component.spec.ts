import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiniPautaFormComponent } from './mini-pauta-form.component';

describe('MiniPautaFormComponent', () => {
  let component: MiniPautaFormComponent;
  let fixture: ComponentFixture<MiniPautaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPautaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPautaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
