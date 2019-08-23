import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material/material.module';
import { OrientadorRoutingModule } from './orientador-routing.module';
import { OrientadorListComponent } from '../orientador-list/orientador-list.component';
import { OrientadorFormComponent } from '../orientador-form/orientador-form.component';
import { OrientadoresComponent } from '../orientadores.component';

@NgModule({
  declarations: [
    OrientadoresComponent,
    OrientadorListComponent,
    OrientadorFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OrientadorRoutingModule
  ],
  exports: []
})
export class OrientadorModule { }
