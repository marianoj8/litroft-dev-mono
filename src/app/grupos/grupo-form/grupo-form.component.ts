import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSort, MatTableDataSource, MatVerticalStepper, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { element } from 'protractor';
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
  anos: number[];
  orientadores$: Observable<Orientador[]>;
  position: string[];
  turmas$: Observable<Turma[]>;
  cursoError$ = new Subject<boolean>();
  turmaError$ = new Subject<boolean>();
  error$ = new Subject<boolean>();
  indexCounter = 0;
  indexElements: number[];
  private sub: Subscription;

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
    private orientadorService: OrientadorService,
    private estudanteService: EstudanteService,
    private turmaService: TurmaService,
    private notificationService: NotificationService,
    private location: Location,
    private dialog: MatDialog,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
    this.position = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    this.indexElements = [];
  }

  creatYears() {
    this.anos = [];
    for (let year = 2010; year <= new Date().getFullYear(); year++) {
      this.anos.push(year);
    }
  }

  ngOnInit() {
    // this.backgroundAnimation();
    this.grupoService.onChangeContext.emit(true);
    this.initForms();

    this.creatYears();

    this.cursos$ = this.cursoService.list();
    this.orientadores$ = this.orientadorService.list();
    this.showprogressBar = false;

    this.sub = this.formGroup01.controls.curso.statusChanges.subscribe(
      () => {

        this.turmas$ = this.turmaService.findByCurso(this.formGroup01.controls.curso.value)
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
            ano: data.anoLetivo
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
  }

  onRefrash(position?: string, curso?: number, grupo?: number) {
    this.sub = this.elementoService.listByParams(position, curso, grupo)
      .pipe(
        // catchError(err => {
        //   this.dialogService.open(ErrorLoadingComponent);
        //   this.error$.next(true);
        //   return of(null);
        // })
      )
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
      ano: [new Date().getFullYear(), [Validators.required]]
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

    this.grupo.anoLetivo = this.formGroup01.controls.ano.value;

    this.grupoService.save(this.grupo)
      .subscribe(
        (data: Grupo) => {
          console.log('ADDING ELEMENTS ' + this.estudantes);
          this.estudantesList.forEach(item => {
            console.log(item);
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
        },
        (err: HttpErrorResponse) => this.showFailerMessage(err)
      );

  }

  showElementSelector() {
    const dialogRef = this.dialog.open(SelectElementComponent,
      {
        data: this.curso.nome ? this.curso.nome : '*',
        height: '500px',
        width: '860px',
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
