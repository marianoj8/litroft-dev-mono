import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CursosComponent } from '../cursos.component';
import { CursoListComponent } from '../curso-list/curso-list.component';
import { CursoFormComponent } from '../curso-form/curso-form.component';
import { MaterialModule } from '../../material/material.module';
import { CursoRoutingModule } from './curso-routing.module';

@NgModule({
  declarations: [
    CursosComponent,
    CursoListComponent,
    CursoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CursoRoutingModule
  ],
  exports: []
})
export class CursoModule { }
