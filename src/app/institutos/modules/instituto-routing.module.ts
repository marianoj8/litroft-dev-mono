import { SearchAllComponent } from './../search-all/search-all.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutoComponent } from '../instituto.component';
import { InstitutoListComponent } from '../instituto-list/instituto-list.component';
import { InstitutoFormComponent } from '../instituto-form/instituto-form.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { InstitutoPriveteListComponent } from '../instituto-privete-list/instituto-privete-list.component';
import { InstitutoDetalheComponent } from '../instituto-detalhe/instituto-detalhe.component';
import { InstitutoNivelComponent } from '../instituto-nivel/instituto-nivel.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutoComponent,
    children: [
      {
        path: '',
        component: InstitutoNivelComponent
      },
      {
        path: 'primario/list',
        component: InstitutoListComponent
      },
      {
        path: 'ciclo1/list',
        component: InstitutoListComponent
      },
      {
        path: 'ciclo2/list',
        component: InstitutoListComponent
      },
      {
        path: 'private/list',
        canActivate: [AuthGuard],
        component: InstitutoPriveteListComponent
      },
      {
        path: 'private/ciclo1/list',
        canActivate: [AuthGuard],
        component: InstitutoPriveteListComponent
      },
      {
        path: 'private/ciclo2/list',
        canActivate: [AuthGuard],
        component: InstitutoPriveteListComponent
      },
      {
        path: 'add/primario',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      },
      {
        path: 'add/ciclo1',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      },
      {
        path: 'add/ciclo2',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      },
      {
        path: 'search/all',
        component: SearchAllComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: InstitutoDetalheComponent
      },
      {
        path: 'edit/primario/:id',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      },
      {
        path: 'edit/ciclo1/:id',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      },
      {
        path: 'edit/ciclo2/:id',
        canActivate: [AuthGuard],
        component: InstitutoFormComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstiutoRoutingModule { }
