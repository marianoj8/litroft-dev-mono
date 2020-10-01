import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AreaFormacaoService } from 'src/app/area-formacao/modules/area-formacao.service';
import { LocalService } from 'src/app/locals/modules/local.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { Instituto } from 'src/app/shared/model/instituto';
import { Local } from 'src/app/shared/model/local';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

import { InstitutoService } from '../modules/instituto.service';
import { AreaFormacao } from './../../shared/model/AreaFormacao';
import { Periodo } from 'src/app/shared/model/periodo';
import { PeriodoService } from 'src/app/periodos/modules/periodos.service';
import { EnsinoNivel } from 'src/app/shared/model/ensinoNivel';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-instituto-form',
  templateUrl: './instituto-form.component.html',
  styleUrls: ['./instituto-form.component.css']
})
export class InstitutoFormComponent implements OnInit {

  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  areaFormacao$: Observable<AreaFormacao[]>;
  locais$: Observable<AreaFormacao>;
  periodos$: Observable<Periodo[]>;
  areaFormacaoErrorError$ = new Subject<boolean>();
  localErrorError$ = new Subject<boolean>();
  instituto = new Instituto();
  salasCount = [1, 2, 3, 4, 5, 6, 7, 8];
  oficinasCount = [1, 2, 3, 4, 5, 6, 7, 8];
  laboratoriosCount = [1, 2, 3, 4, 5, 6];
  public nivelEnsino: number;

  private id = 0;
  error$: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private monografiaService: MonografiaService,
    private institutoService: InstitutoService,
    private areaFormacaoService: AreaFormacaoService,
    private periodoService: PeriodoService,
    private localService: LocalService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private location: Location) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.institutoService.emitShowSearchBar.emit(false);
    this.institutoService.onChangeContext.emit(true);

    if (this.router.url.match('/add/primario')) {
      this.nivelEnsino = 0;
      this.initFormsPrimario();
    }

    if (this.router.url.match('/add/ciclo1')) {
      this.nivelEnsino = 1;
      this.initFormsPrimario();
    }

    if (this.router.url.match('/add/ciclo2')) {
      this.nivelEnsino = 2;
      this.areaFormacao$ = this.areaFormacaoService.list()
        .pipe(catchError(err => {
          this.areaFormacaoErrorError$.next(true);
          return of(null);

        }));

      this.locais$ = this.localService.list()
        .pipe(catchError(err => {
          this.localErrorError$.next(true);
          return of(null);
        }));

      this.initFormsIIciclo();
    }

    this.periodos$ = this.periodoService.list();
    this.locais$ = this.localService.list()
      .pipe(catchError(err => {
        this.localErrorError$.next(true);
        return of(null);
      }));

    if (this.router.url.match('/institutos/edit/primario') || this.router.url.match('/institutos/edit/ciclo1')) {
      this.nivelEnsino = 0;
      this.initFormsPrimario();
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.institutoService.getById(this.id)
        .subscribe(data => {
          this.instituto = data;

          this.formGroup01.patchValue({
            nome: this.instituto.nome,
            sigla: this.instituto.sigla,
            numero: this.instituto.numero
          });

          this.formGroup02.patchValue({
            salas: this.instituto.salas,
            periodo: this.instituto.periodo.id,
            local: this.instituto.local.id
          });

          this.formGroup04.patchValue({
            sobre: this.instituto.sobreInstituto
          });

        });
    }

    if (this.router.url.match('/institutos/edit/ciclo2')) {
      this.nivelEnsino = 2;
      this.initFormsIIciclo();
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.areaFormacao$ = this.areaFormacaoService.list();

      this.institutoService.getById(this.id)
        .subscribe(data => {
          this.instituto = data;

          this.formGroup01.patchValue({
            nome: this.instituto.nome,
            sigla: this.instituto.sigla,
            numero: this.instituto.numero
          });

          this.formGroup02.patchValue({
            salas: this.instituto.salas,
            laboratorios: this.instituto.laboratorios,
            oficinas: this.instituto.oficinas
          });

          this.formGroup03.patchValue({
            areaFormacao: this.instituto.areaFormacao.id,
            periodo: this.instituto.periodo.id,
            local: this.instituto.local.id
          });

          this.formGroup04.patchValue({
            sobre: this.instituto.sobreInstituto
          });

        });
    }


  }

  initFormsPrimario() {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],

      sigla: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]],

      numero: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(11)]],

    });

    this.formGroup02 = this.formBuilder.group({
      salas: [8, [
        Validators.min(8),
        Validators.required
      ]],
      periodo: [null, Validators.required],
      local: [null, Validators.required]
    });

    this.formGroup04 = this.formBuilder.group({
      sobre: [` A instituição conta com ${this.formGroup02.controls.salas.value}
      salas de aulas, com capacidade de albergar anualmente 6 mil estudantes, 302 docentes,
      2 laboratórios e 2 oficinas.`]
    });
  }

  private initFormsIIciclo(): void {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],

      sigla: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)]],

      numero: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(11)]],

    });

    this.formGroup02 = this.formBuilder.group({
      salas: [8, [
        Validators.min(8),
        Validators.required
      ]],
      laboratorios: [4, [Validators.required]],
      oficinas: [0, [Validators.min(0), Validators.required]]
    });

    this.formGroup03 = this.formBuilder.group({
      areaFormacao: [null, Validators.required],
      periodo: [null, Validators.required],
      local: [null, Validators.required]
    });

    this.formGroup04 = this.formBuilder.group({
      sobre: [` A instituição conta com ${this.formGroup02.controls.salas.value}
      salas de aulas, com capacidade de albergar anualmente 6 mil estudantes, 302 docentes,
      ${this.formGroup02.controls.laboratorios.value} laboratórios e ${this.formGroup02.controls.oficinas.value} oficinas.`]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.instituto.nome = this.formGroup01.controls.nome.value;
    this.instituto.sigla = this.formGroup01.controls.sigla.value;
    this.instituto.numero = this.formGroup01.controls.numero.value;
    this.instituto.salas = this.formGroup02.controls.salas.value;

    if (this.nivelEnsino === 0 || this.nivelEnsino === 1) {
      this.instituto.local = new Local(this.formGroup02.controls.local.value);
      this.instituto.nivel = new EnsinoNivel(1);
      this.instituto.periodo = new Periodo(this.formGroup02.controls.periodo.value);
    }

    if (this.nivelEnsino === 1) {
      this.instituto.local = new Local(this.formGroup02.controls.local.value);
      this.instituto.nivel = new EnsinoNivel(2);
      this.instituto.periodo = new Periodo(this.formGroup02.controls.periodo.value);
    }

    if (this.nivelEnsino === 2) {
      this.instituto.local = new Local(this.formGroup03.controls.local.value);
      this.instituto.nivel = new EnsinoNivel(3);
      this.instituto.periodo = new Periodo(this.formGroup03.controls.periodo.value);
    }

    if (this.nivelEnsino === 2) {
      this.instituto.laboratorios = this.formGroup02.controls.laboratorios.value;
      this.instituto.oficinas = this.formGroup02.controls.oficinas.value;
      this.instituto.areaFormacao = new AreaFormacao(this.formGroup03.controls.areaFormacao.value);
    }

    if (this.nivelEnsino === 2) {
      this.instituto.local = new Local(this.formGroup03.controls.local.value);
    }


    this.institutoService.save(this.instituto)
      .pipe(
        catchError((err: HttpErrorResponse) => {

          if (err.status === 403) {
            this.dialogService.open(ForbiddenErrorDialogComponent);
            return of(null);
          }

          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        (data: Instituto) => {
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
        }
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
}
