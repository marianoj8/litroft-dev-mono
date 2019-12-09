import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminComponent } from '../admin.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [],
})
export class AdminModule { }
