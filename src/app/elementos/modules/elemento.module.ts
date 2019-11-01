import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ElementosComponent } from '../elementos.component';
import { ElementoRoutingModule } from './elemento-routing.module';
import { ElementoListComponent } from '../elemento-list/elemento-list.component';
import { ElementoFormComponent } from '../elemento-form/elemento-form.component';
import { ElementoDetalheComponent } from '../elemento-detalhe/elemento-detalhe.component';

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
