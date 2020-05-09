import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../../material/material.module';
import { AccountSettingComponent } from './../account-setting.component';
import { AccountSettingRoutingModule } from './account-setting-routing.module';
import { ListSettingsComponent } from '../list-settings/list-settings.component';

@NgModule({
  declarations: [AccountSettingComponent, ListSettingsComponent],
  imports: [
    CommonModule,
    AccountSettingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  providers: []
})
export class AccountSettingModule { }
