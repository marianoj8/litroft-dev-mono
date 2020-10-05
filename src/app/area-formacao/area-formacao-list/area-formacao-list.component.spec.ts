import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AreaFormacaoListComponent } from './area-formacao-list.component';

describe('AreaFormacaoListComponent', () => {
  let component: AreaFormacaoListComponent;
  let fixture: ComponentFixture<AreaFormacaoListComponent>;

  beforeEach(waitForAsync(() => {
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
