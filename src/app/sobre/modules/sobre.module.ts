import { SobreComponent } from './../sobre.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { SobreRoutingModule } from './sobre-routing.module';

@NgModule({
    declarations: [SobreComponent],
    imports: [
        CommonModule,
        MaterialModule,
        SobreRoutingModule,
    ],
    exports: []
})
export class SobreModule {

}