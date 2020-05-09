import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Subject, Observable, of } from 'rxjs';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { Professor } from 'src/app/shared/model/professor';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { ProfessorService } from '../modules/professor.service';
import { Location } from '@angular/common';
import { Provincia } from 'src/app/shared/model/provincia';
import { Municipio } from 'src/app/shared/model/municipio';
import { catchError } from 'rxjs/operators';
import { ProvinciaService } from 'src/app/provincia/modules/provincia.service';
import { MunicipioService } from 'src/app/municipio/modules/municipio.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent implements OnInit {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  formGroup05: FormGroup;
  professorError$ = new Subject<boolean>();
  provinciaError$ = new Subject<boolean>();
  provincias$: Observable<Provincia[]>;
  municipioError$ = new Subject<boolean>();
  municipios$: Observable<Municipio[]>;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  professor: Professor = new Professor();
  filter = new CustomFilter();
  private id = 0;
  private institutoId = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private professorService: ProfessorService,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private notificationService: NotificationService,
    private dialogService: MatDialog,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.professorService.onChangeContext.emit(true);
    this.initForms();

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


    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
          this.institutoId = data.institutoId;
        });

      this.professorService.getById(this.id)
        .subscribe(data => {
          this.professor = data;

          this.formGroup01.patchValue({
            nome: this.professor.nome,
            sobrenome: this.professor.sobreNome
          });

          this.formGroup02.patchValue({
            sexo: this.professor.sexo,
            dataNascimento: this.professor.dataNascimento,
            bi: this.professor.bi
          });

          this.formGroup03.patchValue({
            fone: this.professor.fone,
            email: this.professor.email,
          });

          this.formGroup04.patchValue({
            provincia: this.professor.provincia.id,
            municipio: this.professor.municipio.id,
            endereco: this.professor.endereco
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
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {

    this.professor.nome = this.formGroup01.controls.nome.value;
    this.professor.sobreNome = this.formGroup01.controls.sobrenome.value;
    this.professor.sexo = this.formGroup02.controls.sexo.value;
    this.professor.dataNascimento = this.resolveDateFormat();
    this.professor.bi = this.formGroup02.controls.bi.value;

    this.professor.fone = this.formGroup03.controls.fone.value;
    this.professor.email = this.formGroup03.controls.email.value;

    this.professor.provincia = new Provincia(this.formGroup04.controls.provincia.value);
    this.professor.municipio = new Municipio(this.formGroup04.controls.municipio.value);
    this.professor.endereco = this.formGroup04.controls.endereco.value;


    this.professorService.save(this.professor)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err);
      }))
      .subscribe(
        (data: Professor) => {
          if (data != null) {
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
          }
        });
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

