import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, Subscription } from 'rxjs';

import { DepartamentoService } from 'src/app/departamentos/modules/departamento.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { MonografiaService } from '../modules/monografia.service';
import { Departamento } from './../../shared/model/departamento';
import { Monografia } from './../../shared/model/monografia';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-mono-form',
  templateUrl: './mono-form.component.html',
  styleUrls: ['./mono-form.component.css'],
})
export class MonoFormComponent implements OnInit, OnDestroy {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  departamentos$: Observable<Departamento[]>;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  monografia: Monografia = new Monografia();
  private id = 0;
  private sub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private monografiaService: MonografiaService,
    private departamentoSerice: DepartamentoService,
    private notificationService: NotificationService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.monografiaService.onChangeContext.emit(true);
    this.initForms();

    this.departamentos$ = this.departamentoSerice.list();

    if (this.router.url.match('/edit')) {
      this.sub = this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.sub = this.monografiaService.getById(this.id)
        .subscribe(data => {
          this.monografia = data;

          this.formGroup01.patchValue({
            tema: this.monografia.tema,
            totalPagina: this.monografia.totalPagina,
          });

          this.formGroup02.patchValue({
            departamento: this.monografia.departamento,
          });
        });
    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      tema: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],
      totalPagina: [30, [
        Validators.required,
        Validators.min(30),
        Validators.max(150)]]
    });

    this.formGroup02 = this.formBuilder.group({
      departamento: [null, [Validators.required]],
      file: [null, [Validators.required]]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }

  private save(stepper: MatVerticalStepper, state): void {
    this.monografia.tema = this.formGroup01.controls.tema.value;
    this.monografia.totalPagina = this.formGroup01.controls.totalPagina.value;
    this.monografia.departamento = this.formGroup02.controls.departamento.value;

   this.monografiaService.save(this.monografia)
      .subscribe(
        (data: Monografia) => {
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

  open() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

}
