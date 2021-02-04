import { UsersComponent } from './../users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';

@NgModule({
    declarations:[UsersComponent, UserListComponent],
    imports:[
        CommonModule,
        MaterialModule,
        UserRoutingModule,
        ReactiveFormsModule
    ],
    exports:[]
})
export class UserModule{

}