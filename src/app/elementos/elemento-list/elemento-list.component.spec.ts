import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoListComponent } from './elemento-list.component';

describe('ElementoListComponent', () => {
  let component: ElementoListComponent;
  let fixture: ComponentFixture<ElementoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
