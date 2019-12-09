import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFormacaoListComponent } from './area-formacao-list.component';

describe('AreaFormacaoListComponent', () => {
  let component: AreaFormacaoListComponent;
  let fixture: ComponentFixture<AreaFormacaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaFormacaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaFormacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
