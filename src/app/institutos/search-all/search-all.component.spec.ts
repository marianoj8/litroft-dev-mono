import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchAllComponent } from './search-all.component';

describe('SearchAllComponent', () => {
  let component: SearchAllComponent;
  let fixture: ComponentFixture<SearchAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
