import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { CursoService } from 'src/app/cursos/modules/curso.service';

import { DepartamentoService } from './departamentos/modules/departamento.service';
import { EspecialidadeService } from './especialidades/modules/especialidade.service';
import { EstudanteService } from './estudantes/modules/estudante.service';
import { GrupoService } from './grupos/modules/grupo.service';
import { HomeService } from './home/modules/home.service';
import { InstitutoService } from './institutos/modules/instituto.service';
import { LoginService } from './login/modules/login.service';
import { MonografiaService } from './monografias/modules/monografia.service';
import { OrientadorService } from './orientadores/modules/OrientadorService.service';
import { ProjetoService } from './projetos/modules/projeto.service';
import { PublicService } from './public/modules/public.service';
import { Instituto } from './shared/model/instituto';
import { AuthService } from './shared/services/security/auth.service';
import { TurmaService } from './turmas/modules/turma.service';
import { AdminService } from './admin/modules/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {


  title = 'Litroft Dev - Mono';
  contextMenu = '***';
  mostrarMenu = false;
  public emitShowAddButton = false;
  onChangeContext: boolean;
  showDateSelect = false;
  formGroup01: FormGroup;
  enableReadMode: boolean;
  years = [];
  public institutos: Instituto[];
  btnMonografiaText = 'Monografias Internas';
  private sub: Subscription;
  institutoFilter = '';
  acessType = '';
  showOrHideMenu = false;
  selectedInstLogo = '';



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    public adminService: AdminService,
    public authService: AuthService,
    private router: Router,
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
    private projetoService: ProjetoService,
    private publicService: PublicService,
    public institutoService: InstitutoService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {

    this.institutos = [];
    for (let i = 2008; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }



    this.institutoService.list().subscribe(resp => this.institutos = resp);

    this.monografiaService.emitShowAddButton
      .subscribe(resp => this.emitShowAddButton = resp);

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
      value => {
        this.onChangeContext = value;

      }
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
    this.sub = this.projetoService.onChangeContextTitle.subscribe(
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

    this.sub = this.publicService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );

    this.sub = this.institutoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    );

    this.sub = this.publicService.enableReadMode.subscribe(
      value => {
        this.enableReadMode = value;
      });


    this.formGroup01 = this.formBuilder.group({
      ano: [new Date().getFullYear()]
    });

    this.formGroup01.patchValue({
      ano: new Date().getFullYear()
    });

    this.homeService.onDataChanged.emit(this.formGroup01.controls.ano.value);

    this.sub = this.formGroup01.statusChanges
      .subscribe(
        () => this.homeService.onDataChanged.emit(this.formGroup01.controls.ano.value)
      );

    this.publicService.emitSelectedSchool.subscribe((resp: Instituto) => {

      this.contextMenu = (resp.id !== null) ? `Monografias do Instituto ${resp.nome}` : 'Monografias Externas';

    });
  }

  switchBetweenPages() {
    if (this.router.routerState.snapshot.url.includes('monografias')) {
      this.btnMonografiaText = 'Monografias Internas';
      this.router.navigate(['public']);
    } else {
      this.router.navigate(['monografias']);
      this.btnMonografiaText = 'Monografias Externas';
    }
  }

  findInstituto() {
    this.institutoService.listFiltered(this.institutoFilter, '').subscribe(
      (resp) => this.institutos = resp
    );
  }

  logOut(drawer: MatDrawer) {
    if (drawer) {
      drawer.close();
    }

    this.authService.doLogOut();
  }

  schoolClicked(instituto: Instituto) {
    this.router.navigate(['/public']);
    this.publicService.emitSelectedSchool.emit(instituto);
  }

  clearSelectedSchool() {
    this.router.navigate(['/public']);
    this.publicService.emitSelectedSchool.emit(new Instituto());
  }

  ngAfterContentChecked(): void {
    this.acessType = localStorage.getItem('entity');
    if (this.acessType !== 'Administrador') {
      // this.selectedInstLogo = `http://localhost:8080/litroft/api/v1/rm/mono/downloadLogo/${item.logoId}`;
      this.showOrHideMenu = true;
    } else {
      this.showOrHideMenu = false;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
