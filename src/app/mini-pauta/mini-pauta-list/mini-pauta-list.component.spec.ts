import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiniPautaListComponent } from './mini-pauta-list.component';

describe('MiniPautaListComponent', () => {
  let component: MiniPautaListComponent;
  let fixture: ComponentFixture<MiniPautaListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPautaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPautaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
