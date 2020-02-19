import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InstitutoListComponent } from '../instituto-list/instituto-list.component';
import { InstitutoFormComponent } from '../instituto-form/instituto-form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { InstitutoComponent } from '../instituto.component';
import { InstiutoRoutingModule } from './instituto-routing.module';
import { InstitutoDetalheComponent } from '../instituto-detalhe/instituto-detalhe.component';
import { InstitutoPriveteListComponent } from '../instituto-privete-list/instituto-privete-list.component';
import { InstitutoNivelComponent } from '../instituto-nivel/instituto-nivel.component';

@NgModule({
  declarations: [
    InstitutoComponent,
    InstitutoListComponent,
    InstitutoFormComponent,
    InstitutoDetalheComponent,
    InstitutoPriveteListComponent,
    InstitutoNivelComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    InstiutoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class InstitutoModule {

}
