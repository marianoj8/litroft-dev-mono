import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from '../public.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PublicRoutingModule } from './public-routing.module';
import { ListAllComponent } from '../list-all/list-all.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReadModeComponent } from '../read-mode/read-mode.component';

@NgModule({
  declarations: [PublicComponent, ListAllComponent, ReadModeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PublicRoutingModule,
    PdfViewerModule
  ],
  exports: []
})
export class PublicModule {

}
