import { NgModule } from '@angular/core';

import { MatriculaComponent } from './../matricula.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MatriculaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatriculaRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [],
})
export class MatriculaModule { }
