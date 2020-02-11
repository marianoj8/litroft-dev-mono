import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InscricaoComponent } from './../inscricao.component';
import { InscricaoRoutingModule } from './inscricao-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    InscricaoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InscricaoRoutingModule,
    FormsModule,
    ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class InscricaoModule { }
