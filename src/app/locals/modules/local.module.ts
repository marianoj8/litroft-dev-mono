import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocalListComponent } from '../local-list/local-list.component';
import { LocalFormComponent } from '../local-form/local-form.component';

@NgModule({
    declarations: [LocalListComponent, LocalFormComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: []
})
export class LocalModule {

}