import { NgModule } from '@angular/core';
import { ProvinciaComponent } from '../provincia.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProvinciaRoutingModule } from './provincia-routing.module';
import { ProvinciaListComponent } from '../provincia-list/provincia-list.component';

@NgModule({
  declarations: [ProvinciaComponent, ProvinciaListComponent],
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
