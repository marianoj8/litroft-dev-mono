import { DiciplinasComponent } from '../diciplinas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiciplinaRoutingModule } from './diciplina-routing.module';
import { DicipliasListComponent } from '../diciplias-list/diciplias-list.component';
import { DiciplinaFormComponent } from '../diciplina-form/diciplina-form.component';


@NgModule({
  declarations: [
    DiciplinasComponent,
    DicipliasListComponent,
    DiciplinaFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DiciplinaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
})
export class DiciplinaModule { }
