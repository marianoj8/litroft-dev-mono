import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiciplinasComponent } from './diciplinas.component';

describe('DiciplinasComponent', () => {
  let component: DiciplinasComponent;
  let fixture: ComponentFixture<DiciplinasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiciplinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
