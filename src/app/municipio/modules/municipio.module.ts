import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { MunicipioComponent } from '../municipio.component';
import { MunicipioListComponent } from '../municipio-list/municipio-list.component';
import { MunicipioFormComponent } from '../municipio-form/municipio-form.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MunicipioComponent,
    MunicipioListComponent,
    MunicipioFormComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: []
})
export class MunicipioModule {

}
