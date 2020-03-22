import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';

import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { Departamento } from 'src/app/shared/model/departamento';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { DepartamentoService } from '../modules/departamento.service';
import { catchError } from 'rxjs/operators';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { of } from 'rxjs';

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
    private monografiaService: MonografiaService,
    private notificationService: NotificationService,
    private location: Location,
    private dialogService: MatDialog
  ) {
    this.monografiaService.emitShowAddButton.emit(true);
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
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err);
      }))
      .subscribe(
        (data: Departamento) => {
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
        },
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
