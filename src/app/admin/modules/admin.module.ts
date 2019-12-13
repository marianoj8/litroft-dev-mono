import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminComponent } from '../admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from '../admin-list/admin-list.component';

@NgModule({
  declarations: [AdminComponent, AdminListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [],
})
export class AdminModule { }
