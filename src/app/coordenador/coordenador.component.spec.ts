import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('CoordenadorComponent', () => {
  let component: CoordenadorComponent;
  let fixture: ComponentFixture<CoordenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
