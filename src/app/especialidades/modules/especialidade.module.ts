import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { EspecialidadeDetalheComponent } from '../especialidade-detalhe/especialidade-detalhe.component';
import { EspecialidadeFormComponent } from '../especialidade-form/especialidade-form.component';
import { EspecialidadeListComponent } from '../especialidade-list/especialidade-list.component';
import { EspecialidadesComponent } from '../especialidades.component';
import { EspecialidadeRoutingModule } from './especialidade-routing.module';

@NgModule({
  declarations: [
    EspecialidadesComponent,
    EspecialidadeListComponent,
    EspecialidadeDetalheComponent,
    EspecialidadeFormComponent
  ],
  imports: [
  CommonModule,
    MaterialModule,
    EspecialidadeRoutingModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class EspecialidadeModule { }
