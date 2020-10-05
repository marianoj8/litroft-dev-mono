import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonografiasComponent } from './monografias.component';

describe('MonografiasComponent', () => {
  let component: MonografiasComponent;
  let fixture: ComponentFixture<MonografiasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonografiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonografiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
