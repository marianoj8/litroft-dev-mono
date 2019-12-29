import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { MunicipioComponent } from '../municipio.component';

@NgModule({
  declarations: [
    MunicipioComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule
  ],
  exports: []
})
export class MunicipioModule {

}
