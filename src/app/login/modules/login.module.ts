import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './../login.component';
import { SignInComponent } from './../sign-in/sign-in.component';
import { ActiveAccountComponent } from './../active-account/active-account.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    ActiveAccountComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  exports: []
})
export class LoginModule { }
