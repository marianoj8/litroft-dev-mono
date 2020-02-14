import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCanActiveGuard } from './admin/guard/AdminCanActiveGuard.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { CustomErrorPageComponent } from './custom-error-page/custom-error-page.component';
import { AcessDenaidComponent } from './shared/acess-denaid/acess-denaid.component';
import { AdminResolverGuard } from './admin/guard/AdminResolverGuard.guard';
import { AdminInternoGuard } from './admin-interno/guard/admin-interno.guard';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  {
    path: 'public',
    loadChildren: 'src/app/public/modules/public.module#PublicModule'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/home/modules/home.module#HomeModule'
  },
  {
    path: 'monografias',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/monografias/modules/monografia.module#MonografiaModule'
  },
  {
    path: 'institutos',
    loadChildren: 'src/app/institutos/modules/instituto.module#InstitutoModule'
  },
  {
    path: 'inscricao',
    loadChildren: 'src/app/inscricao/modules/inscricao.module#InscricaoModule'
  },
  {
    path: 'matriculas',
    loadChildren: 'src/app/matricula/modules/matricula.module#MatriculaModule'
  },
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/cursos/modules/curso.module#CursoModule'
  },
  {
    path: 'projetos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/projetos/modules/projeto.module#ProjetoModule'
  },
  {
    path: 'departamentos',
    canActivate: [AuthGuard],
    loadChildren: 'src/app/departamentos/modules/departamento.module#DepartamentoModule'
  },
  {
    path: 'estudantes',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/estudantes/modules/estudante.module#EstudanteModule'
  },
  {
    path: 'grupos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/grupos/modules/grupo.module#GrupoModule'
  },
  {
    path: 'orientadores',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/orientadores/modules/orientador.module#OrientadorModule'
  },
  {
    path: 'turmas',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/turmas/modules/turma.module#TurmaModule'
  },
  {
    path: 'especialidades',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/especialidades/modules/especialidade.module#EspecialidadeModule'
  },
  {
    path: 'locais',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/locals/modules/local.module#LocalModule'
  },
  {
    path: 'municipios',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/municipio/modules/municipio.module#MunicipioModule'
  },
  {
    path: 'provincias',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/provincia/modules/provincia.module#ProvinciaModule'
  },
  {
    path: 'area-formacao',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: 'src/app/area-formacao/modules/area-formacao.module#AreaFormacaoModule'
  },
  {
    path: 'login',
    loadChildren: 'src/app/login/modules/login.module#LoginModule'
  },
  {
    path: 'adminstration',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    // resolve: [AdminResolverGuard],
    loadChildren: 'src/app/admin/modules/admin.module#AdminModule',
  },
  {
    path: 'directores',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    canActivateChild: [AdminInternoGuard],
    loadChildren: 'src/app/admin-interno/modules/adminInterno.module#AdminInternoModule',
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
