import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { CursoService } from 'src/app/cursos/modules/curso.service';

import { DepartamentoService } from './departamentos/modules/departamento.service';
import { EspecialidadeService } from './especialidades/modules/especialidade.service';
import { EstudanteService } from './estudantes/modules/estudante.service';
import { GrupoService } from './grupos/modules/grupo.service';
import { HomeService } from './home/modules/home.service';
import { LoginService } from './login/modules/login.service';
import { MonografiaService } from './monografias/modules/monografia.service';
import { OrientadorService } from './orientadores/modules/OrientadorService.service';
import { AuthService } from './shared/services/security/auth.service';
import { TurmaService } from './turmas/modules/turma.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Litroft Dev - Mono';
  contextMenu = '';
  mostrarMenu = false;
  onChangeContext: boolean;
  showDateSelect = false;
  formGroup01: FormGroup;
  years = [];
  private sub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private homeService: HomeService,
    private loginService: LoginService,
    private cursoService: CursoService,
    private departamentoService: DepartamentoService,
    private especialidadeService: EspecialidadeService,
    private monografiaService: MonografiaService,
    private estudanteService: EstudanteService,
    private orientadorService: OrientadorService,
    private turmaService: TurmaService,
    private grupoService: GrupoService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {

    for (let i = 2016; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }

    this.sub = this.homeService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = true;
        this.onChangeContext = true;
      }
    );
    this.sub = this.loginService.onChangeContextTitle.subscribe(
      value => this.contextMenu = value
    );
    this.sub = this.loginService.onChangeContext.subscribe(
      value => this.onChangeContext = value
    );
    this.sub = this.cursoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );
    this.sub = this.departamentoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );
    this.sub = this.orientadorService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );
    this.sub = this.turmaService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );
    this.sub = this.grupoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );
    this.sub = this.estudanteService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );
    this.sub = this.monografiaService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );
    this.sub = this.especialidadeService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );

    this.formGroup01 = this.formBuilder.group({
      ano: [2019]
    });

    this.formGroup01.patchValue({
      ano: new Date().getFullYear()
    });

    this.homeService.onDataChanged.emit(this.formGroup01.controls.ano.value);

    this.sub = this.formGroup01.statusChanges.subscribe(
      () => this.homeService.onDataChanged.emit(this.formGroup01.controls.ano.value)
    );

  }

  logOut(drawer: MatDrawer) {
    drawer.close();
    this.authService.doLogOut();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
