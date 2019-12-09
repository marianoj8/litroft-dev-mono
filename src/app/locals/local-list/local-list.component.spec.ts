import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalListComponent } from './local-list.component';

describe('LocalListComponent', () => {
  let component: LocalListComponent;
  let fixture: ComponentFixture<LocalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
