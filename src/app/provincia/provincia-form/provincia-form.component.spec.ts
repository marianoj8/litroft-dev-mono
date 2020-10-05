import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvinciaFormComponent } from './provincia-form.component';

describe('ProvinciaFormComponent', () => {
  let component: ProvinciaFormComponent;
  let fixture: ComponentFixture<ProvinciaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
