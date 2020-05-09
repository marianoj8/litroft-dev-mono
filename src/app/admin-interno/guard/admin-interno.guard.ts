import { Injectable } from '@angular/core';
import { CanLoad, Route, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminInternoService } from '../modules/adminInterno.service';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AdminInternoGuard implements CanActivateChild {
  constructor(public adminInternoService: AdminInternoService, public route: Router, public location: Location) {

  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verify(this.route);
  }


  private verify(router: Router): boolean {
    if (localStorage.getItem('acessType') !== 'Admin') {
      router.navigate(['/denaid']);
      return false;
    }
    return true;
  }

}
