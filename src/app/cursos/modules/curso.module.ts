import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { CursoFormComponent } from '../curso-form/curso-form.component';
import { CursoListComponent } from '../curso-list/curso-list.component';
import { CursosComponent } from '../cursos.component';
import { CursoRoutingModule } from './curso-routing.module';
import { CursoDetalheComponent } from '../curso-detalhe/curso-detalhe.component';

@NgModule({
  declarations: [
    CursosComponent,
    CursoListComponent,
    CursoFormComponent,
    CursoDetalheComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CursoRoutingModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class CursoModule { }
