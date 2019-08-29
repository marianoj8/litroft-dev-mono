import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MaterialModule } from 'src/app/material/material.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

import { MonoDetalheComponent } from '../mono-detalhe/mono-detalhe.component';
import { MonoFormComponent } from '../mono-form/mono-form.component';
import { MonoListComponent } from '../mono-list/mono-list.component';
import { MonografiasComponent } from '../monografias.component';
import { MonografiaRoutingModule } from './monografia-routing.module';

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
    MatFormFieldModule
  ],
})
export class MonografiaModule { }
