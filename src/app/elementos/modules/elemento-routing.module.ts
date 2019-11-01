import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { ElementosComponent } from '../elementos.component';
import { ElementoListComponent } from '../elemento-list/elemento-list.component';
import { ElementoFormComponent } from '../elemento-form/elemento-form.component';
import { ElementoDetalheComponent } from '../elemento-detalhe/elemento-detalhe.component';


const route: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ElementosComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ElementoListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: ElementoFormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: ElementoFormComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: ElementoDetalheComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class ElementoRoutingModule { }
