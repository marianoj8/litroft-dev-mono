import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MatriculaComponent } from './../matricula.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatriculaOpcaoComponent } from '../matricula-opcao/matricula-opcao.component';

@NgModule({
  declarations: [MatriculaComponent, MatriculaOpcaoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatriculaRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [],
  providers: [],
})
export class MatriculaModule { }
