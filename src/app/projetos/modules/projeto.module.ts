import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetosComponent } from '../projetos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjetoRoutingModule } from './projeto-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ProjetoListComponent } from '../projeto-list/projeto-list.component';
import { ProjetoFormComponent } from '../projeto-form/projeto-form.component';
import { ProjetoDetalheComponent } from '../projeto-detalhe/projeto-detalhe.component';

@NgModule({
  declarations: [
    ProjetosComponent,
    ProjetoListComponent,
    ProjetoFormComponent,
    ProjetoDetalheComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProjetoRoutingModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class ProjetoModule {

}
