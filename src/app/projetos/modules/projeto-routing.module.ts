import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjetosComponent } from '../projetos.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { ProjetoListComponent } from '../projeto-list/projeto-list.component';
import { ProjetoFormComponent } from '../projeto-form/projeto-form.component';
import { ProjetoDetalheComponent } from '../projeto-detalhe/projeto-detalhe.component';

const route: Routes = [

  {
    path: '',
    component: ProjetosComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProjetoListComponent
      },
      {
        path: 'add',
        canActivate: [AuthGuard],
        component: ProjetoFormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: ProjetoFormComponent
      },
      {
        path: 'detalhe/:id',
        canActivate: [AuthGuard],
        component: ProjetoDetalheComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class ProjetoRoutingModule {

}
