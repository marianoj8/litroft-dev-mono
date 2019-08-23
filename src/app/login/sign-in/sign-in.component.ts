import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from 'src/app/shared/model/support/token';
import { AuthService } from 'src/app/shared/services/security/auth.service';

import { UsernameAndPassword } from './../../shared/model/support/username-password';
import { NotificationService } from './../../shared/services/notification/notification.service';
import { MatDialog } from '@angular/material';
import { LoginFaildMessageComponent } from 'src/app/shared/login-faild-message/login-faild-message.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  error$ = new Subject<string>();
  user: UsernameAndPassword;
  hide = true;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogService: MatDialog
  ) { }

  ngOnInit() {
    // this.loginForm = new FormGroup({
    //   username: new FormControl(null),
    //   password: new FormControl(null),
    // });

    this.loginForm = this.formBuilder.group({
      username: [null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30)
        ]
      ],
      password: [null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
    });
  }

   onSubmit() {
    this.authService.login(this.loginForm.value)
      .pipe(
        catchError((err) => {
          this.onErrorFromToken();
          this.error$.next(err);
          return of([]);
        })
      )
      .subscribe(
        (data: Token) => this.authService.addTokenToLocalStorage(data),
      );
  }



  onErrorFromToken() {
    const dialogRef = this.dialogService.open(
      LoginFaildMessageComponent,
      {
        height: '190px',
        width: '370px'
      });
  }

}
