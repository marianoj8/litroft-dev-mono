import { NgModule } from '@angular/core';
import { AdminInternoComponent } from '../admin-interno.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminInternoRoutingModule } from './adminInterno-routing.module';

@NgModule({
  declarations: [AdminInternoComponent],
  imports: [
    NgModule,
    AdminInternoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: []
})
export class AdminInterno {

}
