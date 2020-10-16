import { CoordenacaoModule } from './coordenacao/modules/coordenacao.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guard/auth.guard';
import { CustomErrorPageComponent } from './custom-error-page/custom-error-page.component';
import { AcessDenaidComponent } from './shared/acess-denaid/acess-denaid.component';
import { AdminInternoGuard } from './admin-interno/guard/admin-interno.guard';
import { LogoutGuard } from './shared/guard/logout.guard';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  {
    path: 'public',
    loadChildren: () => import('src/app/public/modules/public.module').then(m => m.PublicModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/home/modules/home.module').then(m => m.HomeModule)
  },
  {
    path: 'monografias',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/monografias/modules/monografia.module').then(m => m.MonografiaModule)
  },
  {
    path: 'institutos',
    loadChildren: () => import('src/app/institutos/modules/instituto.module').then(m => m.InstitutoModule)
  },
  {
    path: 'inscricao',
    loadChildren: () => import('src/app/inscricao/modules/inscricao.module').then(m => m.InscricaoModule)
  },
  {
    path: 'matriculas',
    loadChildren: () => import('src/app/matricula/modules/matricula.module').then(m => m.MatriculaModule)
  },
  {
    path: 'ensino-nivel',
    loadChildren: () => import('src/app/ensino-nivel/modules/ensino-nivel.module').then(m => m.EnsinoNivelModule)
  },
  {
    path: 'periodos',
    loadChildren: () => import('src/app/periodos/modules/periodos.module').then(m => m.PeriodoModule)
  },
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/cursos/modules/curso.module').then(m => m.CursoModule)
  },
  {
    path: 'projetos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/projetos/modules/projeto.module').then(m => m.ProjetoModule)
  },
  {
    path: 'coordenacao',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/coordenacao/modules/coordenacao.module').then(m => m.CoordenacaoModule)
  },
  {
    path: 'departamentos',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/app/departamentos/modules/departamento.module').then(m => m.DepartamentoModule)
  },
  {
    path: 'estudantes',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/estudantes/modules/estudante.module').then(m => m.EstudanteModule)
  },
  {
    path: 'grupos',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/grupos/modules/grupo.module').then(m => m.GrupoModule)
  },
  {
    path: 'orientadores',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/orientadores/modules/orientador.module').then(m => m.OrientadorModule)
  },
  {
    path: 'professores',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/professores/modules/professor.module').then(m => m.ProfessorModule)
  },
  {
    path: 'mini-pauta',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/mini-pauta/modules/mini-pauta.module').then(m => m.MiniPautaModule)
  },
  {
    path: 'turmas',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/turmas/modules/turma.module').then(m => m.TurmaModule)
  },
  {
    path: 'diciplinas',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/diciplinas/modules/diciplina.module').then(m => m.DiciplinaModule)
  },
  {
    path: 'especialidades',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/especialidades/modules/especialidade.module').then(m => m.EspecialidadeModule)
  },
  {
    path: 'locais',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/locals/modules/local.module').then(m => m.LocalModule)
  },
  {
    path: 'municipios',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/municipio/modules/municipio.module').then(m => m.MunicipioModule)
  },
  {
    path: 'provincias',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/provincia/modules/provincia.module').then(m => m.ProvinciaModule)
  },
  {
    path: 'classe',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/classe/modules/classe.module').then(m => m.ClasseModule)
  },
  {
    path: 'area-formacao',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/area-formacao/modules/area-formacao.module').then(m => m.AreaFormacaoModule)
  },
  {
    path: 'login',
    canLoad: [LogoutGuard],
    loadChildren: () => import('src/app/login/modules/login.module').then(m => m.LoginModule)
  },
  {
    path: 'adminstration',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    // resolve: [AdminResolverGuard],
    loadChildren: () => import('src/app/admin/modules/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'directores',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    canActivateChild: [AdminInternoGuard],
    loadChildren: () => import('src/app/admin-interno/modules/adminInterno.module').then(m => m.AdminInternoModule),
  },
  {
    path: 'users-account',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('src/app/account-setting/modules/account-setting.module').then(m => m.AccountSettingModule),
  },
  {
    path: 'config',
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    loadChildren: () => import('src/app/shared/config/modules/config.module').then(m => m.ConfigModule),
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
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
