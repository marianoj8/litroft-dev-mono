import { ListSettingsComponent } from './../list-settings/list-settings.component';
import { AccountSettingComponent } from './../account-setting.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingComponent,
    children: [
      {
        path: '',
        component: ListSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingRoutingModule { }
