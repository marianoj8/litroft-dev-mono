import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, AfterContentChecked, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
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
import { environment } from 'src/environments/environment';
import { LocalService } from './locals/modules/local.service';
import { AreaFormacaoService } from './area-formacao/modules/area-formacao.service';
import { AdminInternoService } from './admin-interno/modules/adminInterno.service';
import { CustomFilter } from './shared/model/support/custom-filter';
import { ProvinciaService } from './provincia/modules/provincia.service';
import { MunicipioService } from './municipio/modules/municipio.service';
import { InscricaoService } from './inscricao/modules/inscricao.service';
import { DiciplinaService } from './diciplinas/modules/diciplina.service';
import { CoordenadorService } from './coordenador/modules/coordenador.service';
import { ProfessorService } from './professores/modules/professor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {


  title = 'Litroft Mono';
  contextMenu = '***';
  mostrarMenu = false;
  isPortable = false;
  public emitShowAddButton = false;
  onChangeContext: boolean;
  showDateSelect = false;
  formGroup01: FormGroup;
  enableReadMode: boolean;
  years = [];
  public institutos: Instituto[];
  btnMonografiaText = 'Monografias Internas';
  private sub: Subscription[];
  customFilter = new CustomFilter();
  acessType = '';
  nome = '';
  showOrHideMenu = false;
  showOrHideMenuByNivel = 'No Nivel';
  selectedInstLogo = '';



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        this.isPortable = result.matches;
        this.cursoService.isPortable.emit(result.matches);
        return result.matches;
      }),
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
    private adminInternoService: AdminInternoService,
    private especialidadeService: EspecialidadeService,
    private monografiaService: MonografiaService,
    private estudanteService: EstudanteService,
    private orientadorService: OrientadorService,
    private turmaService: TurmaService,
    private grupoService: GrupoService,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private areaFormacaoService: AreaFormacaoService,
    private projetoService: ProjetoService,
    private localService: LocalService,
    private diciplinaService: DiciplinaService,
    private publicService: PublicService,
    private coordenadorService: CoordenadorService,
    private professorService: ProfessorService,
    public institutoService: InstitutoService,
    public inscricaoService: InscricaoService,
    private formBuilder: FormBuilder,
  ) {
    this.sub = [];
    this.monografiaService.emitShowAddButton
      .subscribe(resp => this.emitShowAddButton = resp);
  }

  ngOnInit(): void {

    this.institutos = [];
    for (let i = 2008; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }

    this.institutoService.list().subscribe(resp => this.institutos = resp);

    this.monografiaService.emitShowAddButton
      .subscribe(resp => this.emitShowAddButton = resp);

    this.sub.push(this.homeService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = true;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.loginService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
      }));

    this.sub.push(this.loginService.onChangeContext.subscribe(
      value => {
        this.emitShowAddButton = true;
        this.onChangeContext = value;
      }));

    this.sub.push(this.cursoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.coordenadorService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.professorService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.diciplinaService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.departamentoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.adminInternoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.orientadorService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.turmaService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.grupoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.projetoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.estudanteService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.inscricaoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.monografiaService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.municipioService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.provinciaService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.especialidadeService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.localService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.areaFormacaoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.publicService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.institutoService.onChangeContextTitle.subscribe(
      value => {
        this.contextMenu = value;
        this.showDateSelect = false;
        this.onChangeContext = true;
      }
    ));

    this.sub.push(this.publicService.enableReadMode.subscribe(
      value => {
        this.enableReadMode = value;
      }));


    this.formGroup01 = this.formBuilder.group({
      ano: [new Date().getFullYear()]
    });

    this.formGroup01.patchValue({
      ano: new Date().getFullYear()
    });

    this.homeService.onDataChanged.emit(this.formGroup01.controls.ano.value);

    this.sub.push(this.formGroup01.statusChanges
      .subscribe(
        () => this.homeService.onDataChanged.emit(this.formGroup01.controls.ano.value)
      ));

    this.publicService.emitSelectedSchool.subscribe((resp: Instituto) => {

      this.contextMenu = (resp.id !== null) ? `Monografias do ${resp.nome}` : 'Monografias Externas';

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
    this.institutoService.listFiltered(this.customFilter).subscribe(
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
    this.nome = localStorage.getItem('nome') + ' ' + localStorage.getItem('sobrenome');
    if (this.acessType !== 'Administrador') {
      this.selectedInstLogo = `${environment.API}/mono/downloadLogo/${localStorage.getItem('entityLogoUri')}`;
      this.showOrHideMenu = true;
      this.showOrHideMenuByNivel = localStorage.getItem('nivel');
      localStorage.setItem('entityId', localStorage.getItem('entityId'));
    } else {
      this.showOrHideMenu = false;
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach((e) => e.unsubscribe());
  }

}
