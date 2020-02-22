import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';

import { Token } from '../../model/support/token';
import { UsernameAndPassword } from '../../model/support/username-password';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UsernameAndPassword;

  constructor(private htp: HttpClient, public router: Router) { }

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
    this.active(user).subscribe((token: Token) => {
      if (token !== undefined && token !== null) {
        this.login({ username: user.username, password: user.password }).subscribe(data => this.addTokenToLocalStorage(data));
      }
    });
  }

  public doLogOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('entity');
    localStorage.removeItem('entityLogoUri');
    localStorage.removeItem('nome');
    localStorage.removeItem('sobrenome');
    localStorage.removeItem('nivel');
    localStorage.removeItem('acessType');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

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

}
