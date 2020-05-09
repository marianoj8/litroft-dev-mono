import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InscricaoComponent } from './../inscricao.component';
import { InscricaoRoutingModule } from './inscricao-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { InscricaoFormComponent } from '../inscricao-form/inscricao-form.component';
import { InscricaoInfoComponent } from '../inscricao-info/inscricao-info.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InscricaoOptionsComponent } from '../inscricao-options/inscricao-options.component';

@NgModule({
  declarations: [
    InscricaoComponent,
    InscricaoFormComponent,
    InscricaoInfoComponent,
    InscricaoOptionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InscricaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PdfViewerModule
  ],
  exports: [],
  providers: [],
})
export class InscricaoModule { }
