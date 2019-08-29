import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, share } from 'rxjs/operators';
import { AuthService } from './shared/services/security/auth.service';
import { MatDrawer } from '@angular/material';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { DepartamentoService } from './departamentos/modules/departamento.service';
import { EspecialidadeService } from './especialidades/modules/especialidade.service';
import { MonografiaService } from './monografias/modules/monografia.service';
import { EstudanteService } from './estudantes/modules/estudante.service';
import { OrientadorService } from './orientadores/modules/OrientadorService.service';
import { TurmaService } from './turmas/modules/turma.service';
import { GrupoService } from './grupos/modules/grupo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Litroft Dev - Mono';
  contextMenu = 'Home';
  mostrarMenu: false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private cursoService: CursoService,
    private departamentoService: DepartamentoService,
    private especialidadeService: EspecialidadeService,
    private monografiaService: MonografiaService,
    private estudanteService: EstudanteService,
    private orientadorService: OrientadorService,
    private turmaService: TurmaService,
    private grupoService: GrupoService,
  ) { }

  ngOnInit(): void {
    this.cursoService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
    this.departamentoService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
    this.orientadorService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
    this.turmaService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
    this.grupoService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
    this.estudanteService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
    this.monografiaService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
    this.especialidadeService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value,
      err => console.log(err)
    );
  }

  logOut(drawer: MatDrawer) {
    drawer.close();
    this.authService.doLogOut();
  }

}
