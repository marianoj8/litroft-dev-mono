import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicipliasListComponent } from './diciplias-list.component';

describe('DicipliasListComponent', () => {
  let component: DicipliasListComponent;
  let fixture: ComponentFixture<DicipliasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DicipliasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DicipliasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
