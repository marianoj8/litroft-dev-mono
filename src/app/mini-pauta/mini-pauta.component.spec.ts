import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPautaComponent } from './mini-pauta.component';

describe('MiniPautaComponent', () => {
  let component: MiniPautaComponent;
  let fixture: ComponentFixture<MiniPautaComponent>;

  beforeEach(async(() => {
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
