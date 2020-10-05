import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProvinciaListComponent } from './provincia-list.component';

describe('ProvinciaListComponent', () => {
  let component: ProvinciaListComponent;
  let fixture: ComponentFixture<ProvinciaListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinciaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
