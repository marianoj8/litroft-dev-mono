import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { ElementoDetalheComponent } from '../elemento-detalhe/elemento-detalhe.component';
import { ElementoFormComponent } from '../elemento-form/elemento-form.component';
import { ElementoListComponent } from '../elemento-list/elemento-list.component';
import { ElementosComponent } from '../elementos.component';
import { ElementoRoutingModule } from './elemento-routing.module';

@NgModule({
  declarations: [
    ElementosComponent,
    ElementoListComponent,
    ElementoFormComponent,
    ElementoDetalheComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ElementoRoutingModule
  ],
  exports: []
})
export class ElementoModule { }
