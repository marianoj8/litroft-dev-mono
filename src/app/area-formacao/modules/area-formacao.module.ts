import { NgModule } from '@angular/core';
import { AreaFormacaoComponent } from '../area-formacao.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AreaFormacaoComponent
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
