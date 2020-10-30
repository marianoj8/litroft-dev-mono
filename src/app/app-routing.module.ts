import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCanActiveGuard } from './admin/guard/AdminCanActiveGuard.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { CustomErrorPageComponent } from './custom-error-page/custom-error-page.component';
import { AcessDenaidComponent } from './shared/acess-denaid/acess-denaid.component';
import { AdminResolverGuard } from './admin/guard/AdminResolverGuard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  {
    path: 'public',
    loadChildren: () => import('src/app/public/modules/public.module').then((m) => m.PublicModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/home/modules/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'monografias',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/monografias/modules/monografia.module').then((m) => m.MonografiaModule)
  },
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/cursos/modules/curso.module').then((m) => m.CursoModule)
  },
  {
    path: 'projetos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/projetos/modules/projeto.module').then((m) => m.ProjetoModule)
  },
  {
    path: 'departamentos',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/departamentos/modules/departamento.module').then((m) => m.DepartamentoModule)
  },
  {
    path: 'estudantes',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/estudantes/modules/estudante.module').then((m) => m.EstudanteModule)
  },
  {
    path: 'grupos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/grupos/modules/grupo.module').then((m) => m.GrupoModule)
  },
  {
    path: 'orientadores',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/orientadores/modules/orientador.module').then((m) => m.OrientadorModule)
  },
  {
    path: 'especialidades',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/especialidades/modules/especialidade.module').then((m) => m.EspecialidadeModule)
  },
  {
    path: 'turmas',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/turmas/modules/turma.module').then((m) => m.TurmaModule)
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/login/modules/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'adminstration',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/admin/modules/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'directores',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/admin/modules/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'denaid',
    component: AcessDenaidComponent,
  },
  {
    path: '**',
    component: CustomErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
