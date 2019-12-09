import { NgModule } from '@angular/core';
import { AreaFormacaoComponent } from '../area-formacao.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AreaFormacaoListComponent } from '../area-formacao-list/area-formacao-list.component';
import { AreaFormacaoFormComponent } from '../area-formacao-form/area-formacao-form.component';

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
