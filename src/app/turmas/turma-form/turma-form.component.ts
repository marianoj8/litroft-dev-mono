import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { Turma } from 'src/app/shared/model/turma';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from '../modules/turma.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatVerticalStepper } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit {
  formGroup01: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  turma: Turma = new Turma();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit() {
    this.turmaService.onChangeContext.emit(true);
    this.initForms();

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.turmaService.getById(this.id)
        .subscribe(data => {
          this.turma = data;

          this.formGroup01.patchValue({
            sigla: this.turma.sigla,
          });
        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      sigla: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {

    console.log(this.turma);


    this.turma.sigla = this.formGroup01.controls.sigla.value;

    this.turmaService.save(this.turma)
      .subscribe(
        (data: Turma) => {
          this.turma = data;
          if (!!state) {
            if (this.router.url.match('/edit')) {
              this.showUpdatedMessage();
            } else {
              this.showSavedMessage();
            }
            this.router.navigate(['/turmas']);
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

}
