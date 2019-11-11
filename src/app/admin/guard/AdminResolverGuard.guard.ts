import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../modules/admin.service';
import { Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminResolverGuard implements Resolve<boolean> {
  private status: boolean;
  public static statusUser: boolean;
  constructor(private adminService: AdminService) {
    adminService.getUserInfo().subscribe(resp => {
      this.status = resp;
      AdminResolverGuard.statusUser = resp;
    });
  }

  resolve(): boolean {




    console.log(this.status);


    if (this.status) {
      return true;
    } else {
      this.adminService.router.navigate(['/denaid']);
      return false;
    }
  }

}
