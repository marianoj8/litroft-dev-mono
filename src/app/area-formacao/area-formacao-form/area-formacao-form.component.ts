import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { AreaFormacao } from 'src/app/shared/model/AreaFormacao';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaFormacaoService } from '../modules/area-formacao.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatVerticalStepper } from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from 'events';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-area-formacao-form',
  templateUrl: './area-formacao-form.component.html',
  styleUrls: ['./area-formacao-form.component.css']
})
export class AreaFormacaoFormComponent implements OnInit {
  formGroup01: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  areaFormacao: AreaFormacao = new AreaFormacao();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private departamentoService: AreaFormacaoService,
    private monografiaService: MonografiaService,
    private notificationService: NotificationService,
    private dialogService: MatDialog,
    private location: Location
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
          this.areaFormacao = data;

          this.formGroup01.patchValue({
            descricao: this.areaFormacao.descricao,
          });
        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      descricao: ['', [
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
    this.areaFormacao.descricao = this.formGroup01.controls.descricao.value;

    this.departamentoService.save(this.areaFormacao)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err)
      }))
      .subscribe(
        (data: AreaFormacao) => {
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


  back() {
    this.location.back();
  }

}

