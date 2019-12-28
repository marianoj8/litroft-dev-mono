import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../material/material.module';
import { AreaFormacaoFormComponent } from '../area-formacao-form/area-formacao-form.component';
import { AreaFormacaoListComponent } from '../area-formacao-list/area-formacao-list.component';
import { AreaFormacaoComponent } from '../area-formacao.component';
import { AreaFormacaoRoutingModule } from './area-formacao-routing.module';

@NgModule({
  declarations: [
    AreaFormacaoComponent,
    AreaFormacaoListComponent,
    AreaFormacaoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AreaFormacaoRoutingModule
  ],
  exports: []
})
export class AreaFormacaoModule {

}
