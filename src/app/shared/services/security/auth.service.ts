import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';

import { Token } from '../../model/support/token';
import { UsernameAndPassword } from '../../model/support/username-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UsernameAndPassword;

  constructor(private htp: HttpClient, public router: Router) { }

  login(user: UsernameAndPassword): Observable<Token> {
    // return this.htp.post<Token>('/login', user)
    return this.htp.post<Token>('http://localhost:8080/login', user)
      .pipe(
        take(1)
      );
  }

  addTokenToLocalStorage(data: Token): void {

    // localStorage.setItem('id', data.user.userId.toString());
    // localStorage.setItem('username', data.user.username);
    // localStorage.setItem('fone', data.user.fone);
    // localStorage.setItem('email', data.user.email);
    if (data.accountId) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('expirationTime', data.expiration);
      localStorage.setItem('acessType', data.accessType);
      this.doLogIn();
    }
  }

  private doLogIn() {
    this.router.navigate(['']);
  }

  doLogOut() {
    // localStorage.removeItem('id');
    // localStorage.removeItem('username');
    // localStorage.removeItem('fone');
    // localStorage.removeItem('email');
    localStorage.removeItem('acessType');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    this.router.navigate(['/public']);
  }

  loggedIn(): boolean {
    return !!(this.getToken());
  }

  getToken(): string {
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


}
