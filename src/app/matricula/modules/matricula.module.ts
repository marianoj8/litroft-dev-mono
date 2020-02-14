import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MatriculaComponent } from './../matricula.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatriculaOpcaoComponent } from '../matricula-opcao/matricula-opcao.component';
import { MatriculaFormComponent } from '../matricula-form/matricula-form.component';

@NgModule({
  declarations: [
    MatriculaComponent,
    MatriculaOpcaoComponent,
    MatriculaFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatriculaRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    PdfViewerModule
  ],
  exports: [],
  providers: [],
})
export class MatriculaModule { }
