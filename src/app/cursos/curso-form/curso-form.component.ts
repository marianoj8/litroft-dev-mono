import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';

import { CursoService } from '../modules/curso.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {
  formGroup01: FormGroup;
  cursos$: Observable<Curso[]>;
  duracoes: number[] = [1, 2, 3, 4, 5, 6];
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  curso: Curso = new Curso();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit() {
    this.cursoService.onChangeContext.emit(true);
    this.initForms();

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.cursoService.getById(this.id)
        .subscribe(data => {
          this.curso = data;

          this.formGroup01.patchValue({
            nome: this.curso.nome,
            duracao: this.curso.duracao
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
      duracao: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(6)]],
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {

    console.log(this.curso);


    this.curso.nome = this.formGroup01.controls.nome.value;
    this.curso.duracao = this.formGroup01.controls.duracao.value;

    this.cursoService.save(this.curso)
      .subscribe(
        (data: Curso) => {
          this.curso = data;
          if (!!state) {
            if (this.router.url.match('/edit')) {
              this.showUpdatedMessage();
            } else {
              this.showSavedMessage();
            }
            this.router.navigate(['/cursos']);
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
