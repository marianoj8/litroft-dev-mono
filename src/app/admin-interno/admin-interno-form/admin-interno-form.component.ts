import { CustomFilter } from './../../shared/model/support/custom-filter';
import { Municipio } from './../../shared/model/municipio';
import { Provincia } from './../../shared/model/provincia';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { InstitutoService } from 'src/app/institutos/modules/instituto.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { AdminInterno } from 'src/app/shared/model/adminInterno';
import { Instituto } from 'src/app/shared/model/instituto';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { AdminInternoService } from '../modules/adminInterno.service';
import { ProvinciaService } from 'src/app/provincia/modules/provincia.service';
import { MunicipioService } from 'src/app/municipio/modules/municipio.service';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';

@Component({
  selector: 'app-admin-interno-form',
  templateUrl: './admin-interno-form.component.html',
  styleUrls: ['./admin-interno-form.component.css']
})
export class AdminInternoFormComponent implements OnInit {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  formGroup05: FormGroup;
  institutos$: Observable<Instituto[]>;
  municipios$: Observable<Municipio[]>;
  provincias$: Observable<Provincia[]>;
  provinciaError$ = new Subject<boolean>();
  municipioError$ = new Subject<boolean>();
  adminInternoError$ = new Subject<boolean>();
  institutoError$ = new Subject<boolean>();
  filter = new CustomFilter();
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  adminInterno: AdminInterno = new AdminInterno();
  private instituto: Instituto = new Instituto();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminInternoService: AdminInternoService,
    private institutoSerice: InstitutoService,
    private notificationService: NotificationService,
    private provinciaService: ProvinciaService,
    private municipioService: MunicipioService,
    private dialogService: MatDialog,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.adminInternoService.onChangeContext.emit(true);
    this.initForms();

    this.institutos$ = this.institutoSerice.list()
      .pipe(catchError(err => {
        // console.log(err);
        this.dialogService.open(ErrorLoadingComponent);
        this.institutoError$.next(true);
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



    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.adminInternoService.getById(this.id)
        .subscribe(data => {
          this.adminInterno = data;

          this.formGroup01.patchValue({
            nome: this.adminInterno.nome,
            sobrenome: this.adminInterno.sobreNome
          });

          this.formGroup02.patchValue({
            sexo: this.adminInterno.sexo,
            dataNascimento: this.adminInterno.dataNascimento,
            bi: this.adminInterno.bi
          });

          this.formGroup03.patchValue({
            email: this.adminInterno.email,
            fone: this.adminInterno.fone
          });

          this.formGroup04.patchValue({
            provincia: this.adminInterno.provincia.id,
            municipio: this.adminInterno.municipio.id,
            endereco: this.adminInterno.endereco
          });

          this.formGroup05.patchValue({
            instituto: this.adminInterno.instituto.id
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
      instituto: [null, Validators.required],
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {

    this.adminInterno.nome = this.formGroup01.controls.nome.value;
    this.adminInterno.sobreNome = this.formGroup01.controls.sobrenome.value;

    this.adminInterno.sexo = this.formGroup02.controls.sexo.value;
    this.adminInterno.dataNascimento = this.resolveDateFormat();
    this.adminInterno.bi = this.formGroup02.controls.bi.value;

    this.adminInterno.fone = this.formGroup03.controls.fone.value;
    this.adminInterno.email = this.formGroup03.controls.email.value;

    this.adminInterno.provincia = new Provincia(this.formGroup04.controls.provincia.value as number);
    this.adminInterno.municipio = new Municipio(this.formGroup04.controls.municipio.value as number);
    this.adminInterno.endereco = this.formGroup04.controls.endereco.value;

    this.adminInterno.instituto = new Instituto(this.formGroup05.controls.instituto.value);

    console.log(this.adminInterno);


    this.adminInternoService.save(this.adminInterno)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err)
      }))
      .subscribe(
        (data: AdminInterno) => {
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

