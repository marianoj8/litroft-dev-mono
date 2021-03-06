import { NgModule } from '@angular/core';
import { AdminInternoComponent } from '../admin-interno.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminInternoRoutingModule } from './adminInterno-routing.module';
import { CommonModule } from '@angular/common';
import { AdminInternoListComponent } from '../admin-interno-list/admin-interno-list.component';
import { AdminInternoFormComponent } from '../admin-interno-form/admin-interno-form.component';

@NgModule({
  declarations: [
    AdminInternoComponent,
    AdminInternoListComponent,
    AdminInternoFormComponent
  ],
  imports: [
    CommonModule,
    AdminInternoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: []
})
export class AdminInternoModule {

}
