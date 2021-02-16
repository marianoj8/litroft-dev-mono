import { from } from 'rxjs';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VitrineComponent } from '../vitrine.component';

import { AuthGuard } from 'src/app/shared/guard/auth.guard';


const route: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: VitrineComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class VitrineRoutingModule { }
