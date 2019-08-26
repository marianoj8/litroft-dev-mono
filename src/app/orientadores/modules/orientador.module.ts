import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { OrientadorFormComponent } from '../orientador-form/orientador-form.component';
import { OrientadorListComponent } from '../orientador-list/orientador-list.component';
import { OrientadoresComponent } from '../orientadores.component';
import { OrientadorRoutingModule } from './orientador-routing.module';
import { OrientadorDetalheComponent } from '../orientador-detalhe/orientador-detalhe.component';

@NgModule({
  declarations: [
    OrientadoresComponent,
    OrientadorListComponent,
    OrientadorFormComponent,
    OrientadorDetalheComponent
  ],
  imports: [
    CommonModule,
    OrientadorRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: []
})
export class OrientadorModule { }
