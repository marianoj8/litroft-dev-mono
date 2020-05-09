import { NgModule } from '@angular/core';

import { PeriodosComponent } from '../../periodos/periodos.component';
import { CommonModule } from '@angular/common';
import { PeriodoRoutingModule } from './periodos-routing.module';

@NgModule({
  declarations: [PeriodosComponent],
  imports: [
    CommonModule,
    PeriodoRoutingModule
  ],
  exports: [],
  providers: [],
})
export class PeriodoModule { }
