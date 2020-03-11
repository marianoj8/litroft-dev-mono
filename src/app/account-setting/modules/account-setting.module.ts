import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../../material/material.module';
import { AccountSettingComponent } from './../account-setting.component';
import { AccountSettingRoutingModule } from './account-setting-routing.module';

@NgModule({
  declarations: [AccountSettingComponent],
  imports: [
    CommonModule,
    AccountSettingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  providers: [],
})
export class AccountSettingModule { }
