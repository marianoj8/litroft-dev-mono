import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EstudanteDetalheComponent } from '../estudante-detalhe/estudante-detalhe.component';
import { EstudanteFromComponent } from '../estudante-from/estudante-from.component';
import { EstudanteListComponent } from '../estudante-list/estudante-list.component';
import { EstudantesComponent } from '../estudantes.component';
import { MaterialModule } from './../../material/material.module';
import { EstudanteRoutingModule } from './estudante-routing.module';
import { EstudanteFilterComponent } from '../estudante-filter/estudante-filter.component';

@NgModule({
  declarations: [
    EstudantesComponent,
    EstudanteListComponent,
    EstudanteFromComponent,
    EstudanteDetalheComponent,
    EstudanteFilterComponent
  ],
  entryComponents: [
    EstudanteFilterComponent
  ],
  imports: [
    CommonModule,
    EstudanteRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: []
})
export class EstudanteModule { }
