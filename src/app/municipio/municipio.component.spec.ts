import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MunicipioComponent } from './municipio.component';

describe('MunicipioComponent', () => {
  let component: MunicipioComponent;
  let fixture: ComponentFixture<MunicipioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
