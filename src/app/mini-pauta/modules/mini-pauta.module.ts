import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { MiniPautaComponent } from './../mini-pauta.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MiniPautaRoutingModule } from './mini-pauta-routing.module';
import { MiniPautaListComponent } from '../mini-pauta-list/mini-pauta-list.component';

@NgModule({
  declarations: [
    MiniPautaComponent,
    MiniPautaListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MiniPautaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
})
export class MiniPautaModule { }
