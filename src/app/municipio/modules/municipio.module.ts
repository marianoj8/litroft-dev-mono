import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { MunicipioComponent } from '../municipio.component';
import { MunicipioListComponent } from '../municipio-list/municipio-list.component';

@NgModule({
  declarations: [
    MunicipioComponent,
    MunicipioListComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule
  ],
  exports: []
})
export class MunicipioModule {

}
