import { NgModule } from '@angular/core';
import { ProvinciaComponent } from '../provincia.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProvinciaRoutingModule } from './provincia-routing.module';

@NgModule({
  declarations: [ProvinciaComponent],
  imports: [
    CommonModule,
    ProvinciaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: []
})
export class ProvinciaModule {

}
