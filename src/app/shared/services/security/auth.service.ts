import { SerialNumberNotFoundDialogComponent } from './../../serial-number-not-found-dialog/serial-number-not-found-dialog.component';
import { NotificationService } from './../notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { take, catchError } from 'rxjs/operators';

import { Token } from '../../model/support/token';
import { UsernameAndPassword } from '../../model/support/username-password';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { ForbiddenErrorDialogComponent } from '../../forbidden-error-dialog/forbidden-error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UsernameAndPassword;
  private gloabalAcessType: string;

  constructor(
    private htp: HttpClient,
    public router: Router,
    private dialogService: MatDialog,
    private notificationService: NotificationService) { }

  public login(user: UsernameAndPassword): Observable<Token> {
    const url = environment.API.replace('/litroft/api/v1/rm', '');
    return this.htp.post<Token>(`${url}/login`, user)
      .pipe(
        take(1)
      );
  }

  private active(user: UsernameAndPassword): Observable<Token> {
    return this.htp.post<Token>(`${environment.API}/signup?serial=${user.serialNumber}`, user)
      .pipe(
        take(1)
      );
  }

  addTokenToLocalStorage(data: Token): void {
    if (data.accountId) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('expirationTime', data.expiration);
      localStorage.setItem('acessType', data.accessType);
      localStorage.setItem('nome', data.user.nome);
      localStorage.setItem('sobrenome', data.user.sobrenome);
      localStorage.setItem('entity', data.user.entity);
      localStorage.setItem('nivel', data.user.nivel);
      localStorage.setItem('entityLogoUri', data.user.entityLogoUri);

      this.gloabalAcessType = localStorage.getItem('acessType');

      if (this.gloabalAcessType !== 'Admin') {
        localStorage.setItem('entityId', `${data.user.entityId}`);
      }

      this.doLogIn(data.user.entity);
    }
  }

  private doLogIn(to: string) {
    if (to === 'Administrador') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['']);
    }
  }

  public activeAccount(user: UsernameAndPassword) {
    this.active(user)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        if (err.status === 404) {
          this.dialogService.open(SerialNumberNotFoundDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err);
      }))
      .subscribe((token: Token) => {
        if (token !== undefined && token !== null) {
          this.login({ username: user.username, password: user.password }).subscribe(data => this.addTokenToLocalStorage(data));
        }
      });
  }

  public doLogOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('entityId');
    localStorage.removeItem('entity');
    localStorage.removeItem('entityLogoUri');
    localStorage.removeItem('nome');
    localStorage.removeItem('sobrenome');
    localStorage.removeItem('nivel');
    localStorage.removeItem('acessType');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    // localStorage.clear();
    this.router.navigate(['/public']);
  }

  loggedIn(): boolean {
    return !!(this.getToken());
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  isTokenEpired(): boolean {
    if (localStorage.getItem('expirationTime')) {
      const tokenTimeLife = new Date(localStorage.getItem('expirationTime')).getTime();
      const acutalDate = new Date(Date.now()).getTime();

      if (acutalDate >= tokenTimeLife) {
        this.doLogOut();
      }
      return !(acutalDate >= tokenTimeLife);
    }

    this.doLogOut();
    return false;
  }

  private showFailerMessage(err: HttpErrorResponse): void {
    this.notificationService
      .componentErrorMessage(':: ' + err.error.message);
  }

}
