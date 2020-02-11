import { InscricaoRoutingModule } from './inscricao-routing.module';
import { NgModule } from '@angular/core';

import { InscricaoComponent } from './../inscricao.component';

@NgModule({
  declarations: [
    InscricaoComponent
  ],
  imports: [InscricaoRoutingModule],
  exports: [],
  providers: [],
})
export class InscricaoModule { }
