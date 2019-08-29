import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentosComponent } from '../departamentos.component';
import { DepartamentoListComponent } from '../departamento-list/departamento-list.component';
import { DepartamentoDetalheComponent } from '../departamento-detalhe/departamento-detalhe.component';
import { DepartamentoFormComponent } from '../departamento-form/departamento-form.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    DepartamentosComponent,
    DepartamentoListComponent,
    DepartamentoDetalheComponent,
    DepartamentoFormComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DepartamentoModule { }
