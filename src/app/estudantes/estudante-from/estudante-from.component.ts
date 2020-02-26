import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, MatDialog, MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { Curso } from 'src/app/shared/model/curso';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { EstudanteService } from '../modules/estudante.service';
import { CursoService } from './../../cursos/modules/curso.service';
import { Estudante } from './../../shared/model/estudante';
import { Turma } from 'src/app/shared/model/turma';
import { Provincia } from 'src/app/shared/model/provincia';
import { Municipio } from 'src/app/shared/model/municipio';
import { TurmaService } from 'src/app/turmas/modules/turma.service';
import { ProvinciaService } from 'src/app/provincia/modules/provincia.service';
import { MunicipioService } from 'src/app/municipio/modules/municipio.service';
import { CustomFilter } from '../../shared/model/support/custom-filter';

@Component({
  selector: 'app-estudante-from',
  templateUrl: './estudante-from.component.html',
  styleUrls: ['./estudante-from.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'AOA' }
  ]
})
export class EstudanteFromComponent implements OnInit {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  formGroup05: FormGroup;
  cursos$: Observable<Curso[]>;
  turmas: Turma[];
  cursoError$ = new Subject<boolean>();
  turmaError$ = new Subject<boolean>();
  estudanteError$ = new Subject<boolean>();

  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  estudante: Estudante = new Estudante();
  private curso: Curso = new Curso();
  private turma: Turma = new Turma();
  private provincia: Provincia = new Provincia();
  private municipio: Municipio = new Municipio();
  provinciaError$ = new Subject<boolean>();
  provincias$: Observable<Provincia[]>;
  municipioError$ = new Subject<boolean>();
  municipios$: Observable<Municipio[]>;
  filter = new CustomFilter();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private estudanteService: EstudanteService,
    private cursoSerice: CursoService,
    private turmaService: TurmaService,
    private municipioService: MunicipioService,
    private provinciaService: ProvinciaService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    public monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.estudanteService.onChangeContext.emit(true);
    this.initForms();
    this.cursos$ = this.cursoSerice.list()
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        this.cursoError$.next(true);
        return of([]);
      }));

    this.provincias$ = this.provinciaService.list()
      .pipe(catchError(err => {
        this.provinciaError$.next(true);
        return of(null);
      }));

    this.formGroup04.controls.provincia.valueChanges
      .subscribe(value => {
        this.filter.nome = '';
        this.filter.provinciaId = value;
        this.municipios$ = this.municipioService.filterByNomeAndProvincia(this.filter)
          .pipe(catchError(err => {
            this.municipioError$.next(true);
            return of(null);
          }));
      });


    this.formGroup05.controls.curso.valueChanges
      .subscribe((onValue) => {
        this.turmaService.findAllByCurso(onValue)
          .subscribe(onValues => this.turmas = onValues);
      });

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.estudanteService.getById(this.id)
        .subscribe(data => {
          this.estudante = data;
          this.formGroup01.patchValue({
            nome: this.estudante.nome,
            sobrenome: this.estudante.sobreNome
          });

          this.formGroup02.patchValue({
            sexo: this.estudante.sexo,
            dataNascimento: this.estudante.dataNascimento,
            bi: this.estudante.bi
          });

          this.formGroup03.patchValue({
            fone: this.estudante.fone,
            email: this.estudante.email
          });

          this.formGroup04.patchValue({
            provincia: this.estudante.provincia.id,
            municipio: this.estudante.municipio.id,
            endereco: this.estudante.endereco
          });

          this.formGroup05.patchValue({
            numeroProcesso: this.estudante.numeroProcesso,
            curso: this.estudante.curso.id,
            turma: this.estudante.turma.id
          });

        });
    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
      sobrenome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
    });

    this.formGroup02 = this.formBuilder.group({
      sexo: ['M'],
      dataNascimento: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)]],
      bi: [null, Validators.required]
    });

    this.formGroup03 = this.formBuilder.group({
      fone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]]
    });

    this.formGroup04 = this.formBuilder.group({
      provincia: [null, Validators.required],
      municipio: [null, Validators.required],
      endereco: [null]
    });

    this.formGroup05 = this.formBuilder.group({
      numeroProcesso: ['', [
        Validators.required,
        Validators.minLength(5)]],
      curso: [null, Validators.required],
      turma: [null, Validators.required]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }

  private save(stepper: MatVerticalStepper, state): void {

    this.estudante.nome = this.formGroup01.controls.nome.value;
    this.estudante.sobreNome = this.formGroup01.controls.sobrenome.value;
    this.estudante.sexo = this.formGroup02.controls.sexo.value;
    this.estudante.dataNascimento = this.resolveDateFormat();
    this.estudante.bi = this.formGroup02.controls.bi.value;
    this.estudante.fone = this.formGroup03.controls.fone.value;
    this.estudante.email = this.formGroup03.controls.email.value;
    this.estudante.endereco = this.formGroup04.controls.endereco.value;
    this.estudante.numeroProcesso = this.formGroup05.controls.numeroProcesso.value;

    this.curso.id = this.formGroup05.controls.curso.value as number;
    this.turma.id = this.formGroup05.controls.turma.value as number;
    this.provincia.id = this.formGroup04.controls.provincia.value as number;
    this.municipio.id = this.formGroup04.controls.municipio.value as number;
    this.estudante.curso = this.curso;
    this.estudante.turma = this.turma;
    this.estudante.provincia = this.provincia;
    this.estudante.municipio = this.municipio;

    this.estudanteService.save(this.estudante)
      .subscribe(
        (data: Estudante) => {
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

  private resolveDateFormat(): string {
    // tslint:disable-next-line: prefer-const
    let date = new Date(this.formGroup02.controls.dataNascimento.value).toISOString().slice(0, 10);
    // tslint:disable-next-line: prefer-const
    let ano: number = Number(date.substring(-1, 4));
    // tslint:disable-next-line: prefer-const
    let mes: number = Number(date.substring(5, 7));
    // tslint:disable-next-line: prefer-const
    let dia: number = Number(date.substring(8, 10));
    let finalDate = '';

    if (dia >= 0 && dia < 31) {
      finalDate = `${ano}-${mes}-${dia + 1}`;
    } else if (dia === 31) {
      finalDate = `${ano}-${mes + 1}-${1}`;
    }

    return finalDate;
  }

  back() {
    this.location.back();
  }
}
