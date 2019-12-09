import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { AreaFormacaoFormComponent } from '../area-formacao-form/area-formacao-form.component';
import { AreaFormacaoListComponent } from '../area-formacao-list/area-formacao-list.component';
import { AreaFormacaoComponent } from '../area-formacao.component';

@NgModule({
  declarations: [
    AreaFormacaoComponent,
    AreaFormacaoListComponent,
    AreaFormacaoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class AreaFormacaoModule {

}
