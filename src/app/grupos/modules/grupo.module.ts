import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';
import { GruposComponent } from './../grupos.component';
import { GrupoListComponent } from '../grupo-list/grupo-list.component';
import { GrupoFormComponent } from '../grupo-form/grupo-form.component';
import { GrupoRoutingModule } from './grupo-routing.module';
import { GrupoDetalheComponent } from '../grupo-detalhe/grupo-detalhe.component';
import { SelectElementComponent } from '../select-element/select-element.component';

@NgModule({
  declarations: [
    GruposComponent,
    GrupoListComponent,
    GrupoFormComponent,
    GrupoDetalheComponent,
    SelectElementComponent
  ],
  entryComponents: [SelectElementComponent],
  imports: [
    CommonModule,
    MaterialModule,
    GrupoRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class GrupoModule { }
