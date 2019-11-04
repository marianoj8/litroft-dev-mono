import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, Subject, of } from 'rxjs';
import { Location } from '@angular/common';

import { Curso } from 'src/app/shared/model/curso';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { CursoService } from '../modules/curso.service';
import { Departamento } from 'src/app/shared/model/departamento';
import { DepartamentoService } from 'src/app/departamentos/modules/departamento.service';
import { catchError } from 'rxjs/operators';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {
  formGroup01: FormGroup;
  formGroup02: FormGroup;
  cursos$: Observable<Curso[]>;
  duracoes: number[] = [1, 2, 3, 4, 5, 6];
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  curso: Curso = new Curso();
  departamentoError$ = new Subject<boolean>();
  departamentos$: Observable<Departamento[]>;
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cursoService: CursoService,
    private monografiaService: MonografiaService,
    private departamentoService: DepartamentoService,
    private notificationService: NotificationService,
    private location: Location
  ) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {

    this.cursoService.onChangeContext.emit(true);
    this.departamentos$ = this.departamentoService.list()
      .pipe(catchError(err => {
        this.departamentoError$.next(true);
        return of(null);
      }));
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

          this.formGroup02.patchValue({
            departamento: this.curso.departamento.id
          });

        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)]],
      duracao: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(6)]],

    });

    this.formGroup02 = this.formBuilder.group({
      departamento: [null, Validators.required]
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }


  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private save(stepper: MatVerticalStepper, state): void {
    this.curso.nome = this.formGroup01.controls.nome.value;
    this.curso.duracao = this.formGroup01.controls.duracao.value;
    this.curso.departamento = new Departamento(this.formGroup02.controls.departamento.value);

    this.cursoService.save(this.curso)
      .subscribe(
        (data: Curso) => {
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
