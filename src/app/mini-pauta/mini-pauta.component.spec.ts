import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiniPautaComponent } from './mini-pauta.component';

describe('MiniPautaComponent', () => {
  let component: MiniPautaComponent;
  let fixture: ComponentFixture<MiniPautaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPautaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPautaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
