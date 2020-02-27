import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from 'src/app/shared/model/support/token';
import { AuthService } from 'src/app/shared/services/security/auth.service';

import { UsernameAndPassword } from './../../shared/model/support/username-password';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

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
    private dialogService: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

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
        catchError((err: HttpErrorResponse) => {
          this.onErrorFromToken(err);
          return of([]);
        })
      )
      .subscribe(
        (data: Token) => this.authService.addTokenToLocalStorage(data),
      );
  }


  onErrorFromToken(err: HttpErrorResponse) {
    if ((err.error.message === 'Unauthorized') && (err.status === 401)) {
      this.showErrorMessage();
    } else {
      console.log(err.status);
    }
  }

  private showErrorMessage(): void {
    this.notificationService.componentLoginFailedMessage();
  }
}
