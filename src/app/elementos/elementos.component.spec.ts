import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementosComponent } from './elementos.component';

describe('ElementosComponent', () => {
  let component: ElementosComponent;
  let fixture: ComponentFixture<ElementosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
