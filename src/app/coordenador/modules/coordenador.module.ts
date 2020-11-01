import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoordernadorRoutingModule } from './coordenador-routing.module';
import { CoordenadorListComponent } from '../coordernador-list/coordenador-list.component';
import { CoordenadorComponent } from '../coordenador.component';
import { CoordenadorFormComponent } from '../coordenador-form/coordenador-form.component';


@NgModule({
  declarations: [
    CoordenadorComponent,
    CoordenadorListComponent,
    CoordenadorFormComponent
  ],
  imports: [
    CommonModule,
    CoordernadorRoutingModule,
    MaterialModule
  ],
  exports: []
})
export class CoordenadorModule { }
