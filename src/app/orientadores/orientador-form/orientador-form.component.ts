import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EspecialidadeService } from 'src/app/especialidades/modules/especialidade.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { Especialidade } from 'src/app/shared/model/especialidade';
import { Orientador } from 'src/app/shared/model/orientador';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';

import { OrientadorService } from '../modules/OrientadorService.service';

@Component({
  selector: 'app-orientador-form',
  templateUrl: './orientador-form.component.html',
  styleUrls: ['./orientador-form.component.css']
})
export class OrientadorFormComponent implements OnInit {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  formGroup05: FormGroup;
  especialidades$: Observable<Especialidade[]>;
  orientadorError$ = new Subject<boolean>();
  especialidadeError$ = new Subject<boolean>();

  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  orientador: Orientador = new Orientador();
  private especialidade: Especialidade = new Especialidade();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private orientadorService: OrientadorService,
    private especialidadeSerice: EspecialidadeService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.orientadorService.onChangeContext.emit(true);
    this.initForms();
    this.especialidades$ = this.especialidadeSerice.list()
      .pipe(catchError(err => {
        // console.log(err);
        this.dialog.open(ErrorLoadingComponent);
        this.especialidadeError$.next(true);
        return of([]);
      }));

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.orientadorService.getById(this.id)
        .subscribe(data => {
          this.orientador = data;

          this.formGroup01.patchValue({
            nome: this.orientador.nome,
            sobrenome: this.orientador.sobreNome
          });

          this.formGroup02.patchValue({
            sexo: this.orientador.sexo,
            dataNascimento: this.orientador.dataNascimento
          });

          this.formGroup03.patchValue({
            bi: this.orientador.bi,
            fone: this.orientador.fone
          });

          this.formGroup04.patchValue({
            email: this.orientador.email,
            endereco: this.orientador.endereco
          });

          this.formGroup05.patchValue({
            especialidade: this.orientador.especialidade.id
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
      especialidade: [null, Validators.required],
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {

    this.orientador.nome = this.formGroup01.controls.nome.value;
    this.orientador.sobreNome = this.formGroup01.controls.sobrenome.value;
    this.orientador.sexo = this.formGroup02.controls.sexo.value;
    this.orientador.dataNascimento = this.resolveDateFormat();
    this.orientador.bi = this.formGroup03.controls.bi.value;
    this.orientador.fone = this.formGroup03.controls.fone.value;
    this.orientador.email = this.formGroup04.controls.email.value;
    this.orientador.endereco = this.formGroup04.controls.endereco.value;

    this.especialidade.id = this.formGroup05.controls.especialidade.value as number;
    this.orientador.especialidade = this.especialidade;

    this.orientadorService.save(this.orientador)
      .subscribe(
        (data: Orientador) => {
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

