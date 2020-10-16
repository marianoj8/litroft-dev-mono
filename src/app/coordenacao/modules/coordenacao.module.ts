import { CoordernacaoRoutingModule } from './coordenacao-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoordenacaoComponent } from './../coordenacao.component';
import { CoordenacaoListComponent } from '../coordenacao-list/coordenacao-list.component';

@NgModule({
  declarations: [
    CoordenacaoComponent,
    CoordenacaoListComponent
  ],
  imports: [
    CommonModule,
    CoordernacaoRoutingModule
  ],
  exports: []
})
export class CoordenacaoModule { }
