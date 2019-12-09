import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessDinaidComponent } from './acess-denaid.component';

describe('AcessDinaidComponent', () => {
  let component: AcessDinaidComponent;
  let fixture: ComponentFixture<AcessDinaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessDinaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessDinaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
