import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginFaildMessageComponent } from './login-faild-message.component';

describe('LoginFaildMessageComponent', () => {
  let component: LoginFaildMessageComponent;
  let fixture: ComponentFixture<LoginFaildMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFaildMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFaildMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
