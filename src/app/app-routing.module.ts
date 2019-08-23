import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CustomErrorPageComponent } from './custom-error-page/custom-error-page.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    loadChildren: 'src/app/cursos/modules/curso.module#CursoModule'
  },
  {
    path: 'estudantes',
    canActivate: [AuthGuard],
    loadChildren: 'src/app/estudantes/modules/estudante.module#EstudanteModule'
  },
  {
    path: 'grupos',
    canActivate: [AuthGuard],
    loadChildren: 'src/app/grupos/modules/grupo.module#GrupoModule'
  },
  {
    path: 'orientadores',
    canActivate: [AuthGuard],
    loadChildren: 'src/app/orientadores/modules/orientador.module#OrientadorModule'
  },
  {
    path: 'turmas',
    canActivate: [AuthGuard],
    loadChildren: 'src/app/turmas/modules/turma.module#TurmaModule'
  },
  {
    path: 'login',
    loadChildren: 'src/app/login/modules/login.module#LoginModule'
  },
  { path: '**', component: CustomErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
