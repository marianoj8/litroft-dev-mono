import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAcess();
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verifyAcess();
  }

  private verifyAcess(): boolean {
    if (this.authService.loggedIn() && this.authService.isTokenEpired()) {
      return true;
    } else {
      this.authService.router.navigate(['/login']);
      return false;
    }
  }

}
