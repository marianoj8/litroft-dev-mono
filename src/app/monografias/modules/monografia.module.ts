import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MaterialModule } from 'src/app/material/material.module';
import { MonoDetalheComponent } from '../mono-detalhe/mono-detalhe.component';
import { MonoFormComponent } from '../mono-form/mono-form.component';
import { MonoListComponent } from '../mono-list/mono-list.component';
import { MonografiasComponent } from '../monografias.component';
import { MonografiaRoutingModule } from './monografia-routing.module';
import { CustomPipesModule } from '../../shared/custom-pipes/module/custom-pipes.module';

@NgModule({
  declarations: [
    MonografiasComponent,
    MonoListComponent,
    MonoFormComponent,
    MonoDetalheComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MonografiaRoutingModule,
    MatFormFieldModule,
    PdfViewerModule,
    FormsModule,
    CustomPipesModule
  ],
})
export class MonografiaModule { }
