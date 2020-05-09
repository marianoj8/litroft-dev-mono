import { CommonModule } from '@angular/common';
import { ProfessoresComponent } from './../professores.component';
import { NgModule } from '@angular/core';
import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorListComponent } from '../professor-list/professor-list.component';
import { ProfessorFormComponent } from '../professor-form/professor-form.component';
import { ProfessorDetalheComponent } from '../professor-detalhe/professor-detalhe.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfessoresComponent,
    ProfessorListComponent,
    ProfessorFormComponent,
    ProfessorDetalheComponent]
  ,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessorRoutingModule
  ],
  exports: [],
})
export class ProfessorModule { }
