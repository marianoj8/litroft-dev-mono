import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminComponent } from '../admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent, AdminListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
})
export class AdminModule { }
