import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { Diciplina } from 'src/app/shared/model/diciplina';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { DiciplinaService } from '../modules/diciplina.service';

@Component({
  selector: 'app-diciplina-form',
  templateUrl: './diciplina-form.component.html',
  styleUrls: ['./diciplina-form.component.css']
})
export class DiciplinaFormComponent implements OnInit {

  formGroup01: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  diciplina: Diciplina = new Diciplina();
  private error$: Subject<boolean>;
  private id = 0;
  private entityId = Number.parseInt(localStorage.getItem('entitytId'), 10);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private diciplinaService: DiciplinaService,
    private notificationService: NotificationService,
    private location: Location,
    private dialogService: MatDialog
  ) {

  }

  ngOnInit() {
    this.diciplinaService.onChangeContext.emit(true);
    this.initForms();

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.diciplinaService.getById(this.id, this.entityId)
        .subscribe(data => {
          this.diciplina = data;

          this.formGroup01.patchValue({
            nome: this.diciplina.nome,
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
    this.diciplina.nome = this.formGroup01.controls.nome.value;

    this.diciplinaService.save(this.diciplina)
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
        (data: Diciplina) => {
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
