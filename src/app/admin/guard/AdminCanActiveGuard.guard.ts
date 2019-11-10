import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AdminService } from '../modules/admin.service';
import { Admin } from 'src/app/shared/model/admin';

@Injectable({ providedIn: 'root' })
export class AdminCanActiveGuard implements CanActivate {
  private admin: Admin;
  constructor(private adminService: AdminService) { }

  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.adminService.getUserInfo().subscribe((resp: Admin) => this.admin = resp);
    if (this.admin !== undefined) {
      return true;
    }
    this.adminService.router.navigate(['/dinaid']);
    return false;
  }

}
