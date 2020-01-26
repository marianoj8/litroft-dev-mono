import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from '../public.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PublicRoutingModule } from './public-routing.module';
import { ListAllComponent } from '../list-all/list-all.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReadModeComponent } from '../read-mode/read-mode.component';
import { CustomPipesModule } from 'src/app/shared/custom-pipes/module/custom-pipes.module';
import { DetalheComponent } from '../read-mode/detalhe/detalhe.component';

@NgModule({
  declarations: [PublicComponent, ListAllComponent, ReadModeComponent, DetalheComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PublicRoutingModule,
    PdfViewerModule,
    CustomPipesModule
  ],
  exports: []
})
export class PublicModule {

}
