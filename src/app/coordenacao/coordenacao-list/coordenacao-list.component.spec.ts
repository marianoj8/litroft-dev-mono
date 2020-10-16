import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordenacaoListComponent } from './coordenacao-list.component';

describe('CoordenacaoListComponent', () => {
  let component: CoordenacaoListComponent;
  let fixture: ComponentFixture<CoordenacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordenacaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
