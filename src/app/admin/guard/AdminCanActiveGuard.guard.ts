import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

import { AdminService } from '../modules/admin.service';
import { AdminResolverGuard } from './AdminResolverGuard.guard';

@Injectable({ providedIn: 'root' })
export class AdminCanActiveGuard implements CanLoad {

  constructor(private adminService: AdminService) {
  }

  canLoad(): boolean {
    if (AdminResolverGuard.statusUser) {
      return true;
    } else {
      this.adminService.router.navigate(['/denaid']);
      return false;
    }
  }

}
