import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ActiveAccountComponent } from '../active-account/active-account.component';

const route: Routes = [
  {
    path: '', component: LoginComponent, children: [
      { path: '', component: SignInComponent },
      { path: 'active-account', component: ActiveAccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
