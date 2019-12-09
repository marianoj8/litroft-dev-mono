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
  cursoError$ = new Subject<boolean>();
  estudanteError$ = new Subject<boolean>();

  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  estudante: Estudante = new Estudante();
  private curso: Curso = new Curso();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private estudanteService: EstudanteService,
    private cursoSerice: CursoService,
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
            dataNascimento: this.estudante.dataNascimento
          });

          this.formGroup03.patchValue({
            bi: this.estudante.bi,
            fone: this.estudante.fone
          });

          this.formGroup04.patchValue({
            email: this.estudante.email,
            endereco: this.estudante.endereco
          });

          this.formGroup05.patchValue({
            numeroProcesso: this.estudante.numeroProcesso,
            curso: this.estudante.curso.id
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
        Validators.maxLength(10)]]
    });

    this.formGroup03 = this.formBuilder.group({
      bi: [null, Validators.required],
      fone: [null, [Validators.required]]
    });

    this.formGroup04 = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      endereco: [null]
    });

    this.formGroup05 = this.formBuilder.group({
      numeroProcesso: ['', [
        Validators.required,
        Validators.minLength(5)]],
      curso: [null, Validators.required],
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
    this.estudante.bi = this.formGroup03.controls.bi.value;
    this.estudante.fone = this.formGroup03.controls.fone.value;
    this.estudante.email = this.formGroup04.controls.email.value;
    this.estudante.endereco = this.formGroup04.controls.endereco.value;
    this.estudante.numeroProcesso = this.formGroup05.controls.numeroProcesso.value;

    this.curso.id = this.formGroup05.controls.curso.value as number;
    this.estudante.curso = this.curso;

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
    let date = new Date(this.formGroup02.controls.dataNascimento.value).toISOString().slice(0, 10);
    let ano: number = Number(date.substring(-1, 4));
    let mes: number = Number(date.substring(5, 7));
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
