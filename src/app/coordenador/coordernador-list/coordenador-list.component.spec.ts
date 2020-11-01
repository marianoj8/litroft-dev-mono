import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordenadorListComponent } from './coordenador-list.component';


describe('CoordenadorListComponent', () => {
  let component: CoordenadorListComponent;
  let fixture: ComponentFixture<CoordenadorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordenadorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
