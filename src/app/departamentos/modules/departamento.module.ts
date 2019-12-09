import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { DepartamentoDetalheComponent } from '../departamento-detalhe/departamento-detalhe.component';
import { DepartamentoFormComponent } from '../departamento-form/departamento-form.component';
import { DepartamentoListComponent } from '../departamento-list/departamento-list.component';
import { DepartamentosComponent } from '../departamentos.component';
import { DepartamentoRoutingModule } from './departamento-routing.module';


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
