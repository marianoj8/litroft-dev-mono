import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material/material.module';
import { VitrineComponent} from './../vitrine.component';

import { VitrineRoutingModule } from './vitrine-routing.module';

@NgModule({
  declarations: [
    VitrineComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VitrineRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class VitrineModule { }