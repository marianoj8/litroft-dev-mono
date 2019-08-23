import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { TurmasComponent } from '../turmas.component';
import { TurmaListComponent } from '../turma-list/turma-list.component';
import { TurmaFormComponent } from '../turma-form/turma-form.component';
import { TurmaRoutingModule } from './turma-routing.module';

@NgModule({
  declarations: [
    TurmasComponent,
    TurmaListComponent,
    TurmaFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TurmaRoutingModule
  ],
  exports: []
})
export class TurmaModule { }
