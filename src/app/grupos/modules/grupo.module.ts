import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { GruposComponent } from './../grupos.component';
import { GrupoListComponent } from '../grupo-list/grupo-list.component';
import { GrupoFormComponent } from '../grupo-form/grupo-form.component';
import { GrupoRoutingModule } from './grupo-routing.module';

@NgModule({
  declarations: [
    GruposComponent,
    GrupoListComponent,
    GrupoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GrupoRoutingModule
  ],
  exports: []
})
export class GrupoModule { }
