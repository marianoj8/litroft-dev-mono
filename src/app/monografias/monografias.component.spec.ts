import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonografiasComponent } from './monografias.component';

describe('MonografiasComponent', () => {
  let component: MonografiasComponent;
  let fixture: ComponentFixture<MonografiasComponent>;

  beforeEach(async(() => {
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
