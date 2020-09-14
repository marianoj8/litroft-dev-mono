import { Injectable } from '@angular/core';
import { Route, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/security/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanLoad {

  constructor(
    private route: Router,
    private auhtService: AuthService) {

  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn();
  }

  private isLoggedIn(): boolean {
    if (this.auhtService.loggedIn()) {
      this.route.navigate(['/home']);
      return false;
    }
    return true;
  }

}
