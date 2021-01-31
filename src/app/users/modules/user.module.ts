import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        MaterialModule,
        UserRoutingModule
    ],
    exports:[]
})
export class UserModule{

}