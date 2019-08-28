import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { EventEmitter } from 'events';
import { Especialidade } from 'src/app/shared/model/especialidade';
import { Router, ActivatedRoute } from '@angular/router';
import { EspecialidadeService } from '../modules/especialidade.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatVerticalStepper } from '@angular/material';

@Component({
  selector: 'app-especialidade-form',
  templateUrl: './especialidade-form.component.html',
  styleUrls: ['./especialidade-form.component.css']
})
export class EspecialidadeFormComponent implements OnInit {
  formGroup01: FormGroup;
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  especialidade: Especialidade = new Especialidade();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private especialidadeService: EspecialidadeService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit() {
    this.especialidadeService.onChangeContext.emit(true);
    this.initForms();

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.especialidadeService.getById(this.id)
        .subscribe(data => {
          this.especialidade = data;

          this.formGroup01.patchValue({
            descricao: this.especialidade.descricao,
          });
        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      descricao: ['', [
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

    console.log(this.especialidade);


    this.especialidade.descricao = this.formGroup01.controls.descricao.value;

    this.especialidadeService.save(this.especialidade)
      .subscribe(
        (data: Especialidade) => {
          this.especialidade = data;
          if (!!state) {
            if (this.router.url.match('/edit')) {
              this.showUpdatedMessage();
            } else {
              this.showSavedMessage();
            }
            this.router.navigate(['/especialidades']);
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
