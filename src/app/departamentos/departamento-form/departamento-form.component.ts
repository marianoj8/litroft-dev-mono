import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatVerticalStepper } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from 'events';
import { Location } from '@angular/common';

import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { Departamento } from 'src/app/shared/model/departamento';
import { DepartamentoService } from '../modules/departamento.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.css']
})
export class DepartamentoFormComponent implements OnInit {
  formGroup01: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  departamento: Departamento = new Departamento();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private notificationService: NotificationService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.departamentoService.onChangeContext.emit(true);
    this.initForms();

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.departamentoService.getById(this.id)
        .subscribe(data => {
          this.departamento = data;

          this.formGroup01.patchValue({
            nome: this.departamento.nome,
          });
        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(70)]],
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.departamento.nome = this.formGroup01.controls.nome.value;

    this.departamentoService.save(this.departamento)
      .subscribe(
        (data: Departamento) => {
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
        (err: HttpErrorResponse) => {

        }
      );

  }


  private showSavedMessage(): void {
    this.notificationService.componentSavedSuccessfulMessage();
  }

  private showUpdatedMessage(): void {
    this.notificationService.componentUpdatedSuccessfulMessage();
  }

  private showFailerMessage(err: HttpErrorResponse): void {
    const erros: string[] = err.error.errors;
    for (let index = 0; index < erros.length; index++) {
      console.log(err.error.errors[index].field);
    }
  }

  back() {
    this.location.back();
  }

}
