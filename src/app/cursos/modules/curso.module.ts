import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { CursoDetalheComponent } from '../curso-detalhe/curso-detalhe.component';
import { CursoFormComponent } from '../curso-form/curso-form.component';
import { CursoListComponent } from '../curso-list/curso-list.component';
import { CursoSearchComponent } from '../curso-search/curso-search.component';
import { CursosComponent } from '../cursos.component';
import { CursoRoutingModule } from './curso-routing.module';

@NgModule({
  declarations: [
    CursosComponent,
    CursoListComponent,
    CursoFormComponent,
    CursoDetalheComponent,
    CursoSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CursoRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CursoSearchComponent
  ],
  exports: []
})
export class CursoModule { }
