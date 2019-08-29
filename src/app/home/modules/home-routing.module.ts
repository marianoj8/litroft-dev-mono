import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './../home.component';
import { BarchartComponent } from '../barchart/barchart.component';

const route: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: BarchartComponent,
          }
        ]
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class HomeRoutingModlue { }
