import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AreaFormacaoService } from 'src/app/area-formacao/modules/area-formacao.service';
import { LocalService } from 'src/app/locals/modules/local.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { Instituto } from 'src/app/shared/model/instituto';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

import { InstitutoService } from '../modules/instituto.service';
import { AreaFormacao } from './../../shared/model/AreaFormacao';
import { Local } from 'src/app/shared/model/local';

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
  areaFormacao$: Observable<AreaFormacao>;
  locais$: Observable<AreaFormacao>;
  areaFormacaoErrorError$ = new Subject<boolean>();;
  localErrorError$ = new Subject<boolean>();;
  instituto = new Instituto();
  salasCount = [1, 2, 3, 4, 6, 7, 8];
  laboratoriosCount = [1, 2, 3, 4, 5, 6];

  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private monografiaService: MonografiaService,
    private institutoService: InstitutoService,
    private areaFormacaoService: AreaFormacaoService,
    private localService: LocalService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.institutoService.onChangeContext.emit(true);

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

    this.initForms();


    if (this.router.url.match('/edit')) {
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

          // this.formGroup02.patchValue({
          //   departamento: this.instituto.departamento.id
          // });

        });

    }

  }

  initForms() {
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
    });

    this.formGroup03 = this.formBuilder.group({
      areaFormacao: [null, Validators.required],
      local: [null, Validators.required]
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
    this.instituto.laboratorios = this.formGroup02.controls.laboratorios.value;
    this.instituto.areaFormacao = new AreaFormacao(this.formGroup03.controls.areaFormacao.value);
    this.instituto.local = new Local(this.formGroup03.controls.local.value);

    this.institutoService.save(this.instituto)
      .subscribe(
        (data: Instituto) => {
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

  back() {
    this.location.back();
  }
}
