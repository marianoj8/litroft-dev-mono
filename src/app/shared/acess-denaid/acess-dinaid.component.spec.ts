import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcessDenaidComponent } from './acess-denaid.component';

describe('AcessDinaidComponent', () => {
  let component: AcessDenaidComponent;
  let fixture: ComponentFixture<AcessDenaidComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcessDenaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcessDenaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
