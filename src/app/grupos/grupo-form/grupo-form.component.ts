import { AnoLetivo } from './../../shared/model/support/AnoLetivo';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { ElementoService } from 'src/app/elementos/modules/elementos.service';
import { EstudanteService } from 'src/app/estudantes/modules/estudante.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { OrientadorService } from 'src/app/orientadores/modules/OrientadorService.service';
import { Curso } from 'src/app/shared/model/curso';
import { Elemento } from 'src/app/shared/model/elemento';
import { Estudante } from 'src/app/shared/model/estudante';
import { Grupo } from 'src/app/shared/model/grupo';
import { Orientador } from 'src/app/shared/model/orientador';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { Turma } from 'src/app/shared/model/turma';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { TurmaService } from 'src/app/turmas/modules/turma.service';
import { GrupoService } from '../modules/grupo.service';
import { SelectElementComponent } from './../select-element/select-element.component';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { AnoLetivoService } from 'src/app/ano-letivo/modules/ano-letivo.service';


@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.css']
})
export class GrupoFormComponent implements OnInit {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  grupo: Grupo = new Grupo();
  curso: Curso = new Curso();
  private id = 0;

  showprogressBar: boolean;
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  estudantes: MatTableDataSource<Estudante>;
  estudantesList: Estudante[] = [];
  elementosList: Elemento[] = [];
  cursos$: Observable<Curso[]>;
  years: AnoLetivo[];
  orientadores$: Observable<Orientador[]>;
  position: string[];
  turmas$: Observable<Turma[]>;
  cursoError$ = new Subject<boolean>();
  turmaError$ = new Subject<boolean>();
  error$ = new Subject<boolean>();
  indexCounter = 0;
  indexElements: number[];
  private sub: Subscription;
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'nome',
    // 'sobrenome',
    'sexo',
    'bi',
    'detalhe',
    'remove',
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private grupoService: GrupoService,
    private elementoService: ElementoService,
    private cursoService: CursoService,
    private anoLetivoLetivoService: AnoLetivoService,
    private orientadorService: OrientadorService,
    private estudanteService: EstudanteService,
    private turmaService: TurmaService,
    private notificationService: NotificationService,
    private location: Location,
    private dialogService: MatDialog,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
    this.position = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    this.indexElements = [];
  }

  creatYears() {
    this.years = [];
    this.anoLetivoLetivoService.list('').subscribe((e) => this.years = e);
  }

  ngOnInit() {
    // this.backgroundAnimation();
    this.grupoService.onChangeContext.emit(true);
    this.initForms();

    this.creatYears();

    this.cursos$ = this.cursoService.list(this.entityId);
    this.orientadores$ = this.orientadorService.list();
    this.showprogressBar = false;

    this.sub = this.formGroup01.controls.curso.statusChanges.subscribe(
      () => {
        this.turmas$ = this.turmaService.findAllByCurso(this.formGroup01.controls.curso.value, this.entityId)
          .pipe(
            catchError(error => {
              this.turmaError$.next(error);
              return of(null);
            })
          );

        this.turmas$.subscribe(
          (t) => {
            if (t.length > 0) {
              this.curso = t[0].curso;
            }
          }
        );
      }
    );

    this.grupoService.emitSelectedElements
      .subscribe(
        value => {
          this.estudantes = value;
          this.estudantesList = value;
        });

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });


      this.showprogressBar = true;

      this.grupoService.getById(this.id)
        .subscribe(data => {
          this.curso = data.curso;
          this.grupo = data;

          this.formGroup01.patchValue({
            descricao: data.descricao,
            curso: data.curso.id,
            anoLetivo: data.anoLetivo.id
          });

          this.formGroup02.patchValue({
            turma: data.turma.id,
            posicao: data.posicao,
          });

          this.formGroup03.patchValue({
            orientador: data.orientador.id,
          });

          this.onRefrash(data.posicao, data.curso.id, data.id);
        });
    }


    this.formGroup02.controls.turma.valueChanges
      .subscribe(onValue => this.turmaService.getById(onValue, this.entityId)
        .subscribe((newValue: Turma) => {
          this.filtro.curso = newValue.curso.nome;
          this.filtro.turma = newValue.sigla;
        }));

  }

  onRefrash(position?: string, curso?: number, grupo?: number) {
    this.sub = this.elementoService.listByParams(position, curso, grupo)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err);
      }))
      .subscribe(
        (value: Elemento[]) => this.relist(value));
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      descricao: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],
      curso: [null, [
        Validators.required]],
      anoLetivo: [13, Validators.required]
    });

    this.formGroup02 = this.formBuilder.group({
      turma: [null, [
        Validators.required]],
      posicao: [null, [
        Validators.required]],
    });

    this.formGroup03 = this.formBuilder.group({
      orientador: [null, [
        Validators.required]]
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.grupo.descricao = this.formGroup01.controls.descricao.value;
    this.grupo.curso = new Curso(this.formGroup01.controls.curso.value);

    this.grupo.turma = new Turma(this.formGroup02.controls.turma.value);
    this.grupo.posicao = this.formGroup02.controls.posicao.value;
    this.grupo.orientador = new Orientador(this.formGroup03.controls.orientador.value);

    this.grupo.anoLetivo = new AnoLetivo(this.formGroup01.controls.anoLetivo.value);

    this.grupoService.save(this.grupo)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err);
      }))
      .subscribe(
        (data: Grupo) => {
          if (data != null) {
            this.estudantesList.forEach(item => {
              this.elementosList.push(
                new Elemento(null,
                  item,
                  data.orientador,
                  data,
                  data.curso,
                  data.posicao));
            });

            this.elementoService.saveMulty(this.elementosList)
              .subscribe((d) => {
                this.estudanteService.set(this.estudantesList).subscribe(() => { });
              });

            if (!!state) {
              if (data != null) {
                if (this.router.url.match('/edit')) {
                  this.showUpdatedMessage();
                } else {
                  this.showSavedMessage();
                }
                this.back();
              } else {
                if (this.router.url.match('/edit')) {
                  this.showUpdatedMessage();
                } else {
                  this.showSavedMessage();
                }
                stepper.reset();
              }
            }
          }
        });

  }

  showElementSelector() {
    const dialogRef = this.dialogService.open(SelectElementComponent,
      {
        data: this.filtro,
        height: '510px',
        width: '960px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe(
      (result: boolean) => { }
    );
  }

  private showFailerMessage(err: HttpErrorResponse): void {
    this.notificationService
      .componentErrorMessage(':: ' + err.error.message);
  }

  private showSavedMessage(): void {
    this.notificationService.componentSavedSuccessfulMessage();
  }

  private showUpdatedMessage(): void {
    this.notificationService.componentUpdatedSuccessfulMessage();
  }

  back() {
    this.location.back();
  }

  removeElementAt(estudante: Estudante) {
    this.estudantesList.map((item, i: number) => {
      if (estudante.id === item.id) {
        this.estudantesList.splice(i, 1);
      }
    });
  }

  relist(elements) {
    const array = elements.map((item: Elemento) => {
      return {
        ...item.estudante
      };
    });
    this.estudantes = new MatTableDataSource(array);
    this.estudantes.sort = this.sort;
    this.estudantesList = this.estudantes.data;
  }
}
