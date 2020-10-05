import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiciplinaFormComponent } from './diciplina-form.component';

describe('DiciplinaFormComponent', () => {
  let component: DiciplinaFormComponent;
  let fixture: ComponentFixture<DiciplinaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiciplinaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiciplinaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
