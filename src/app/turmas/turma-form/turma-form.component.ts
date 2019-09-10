import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MatVerticalStepper, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { Turma } from 'src/app/shared/model/turma';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { TurmaService } from '../modules/turma.service';
import { Curso } from 'src/app/shared/model/curso';
import { CursoService } from './../../cursos/modules/curso.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit {
  formGroup01: FormGroup;
  cursos$: Observable<Curso[]>;
  cursoError$ = new Subject<boolean>();
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  turma: Turma = new Turma();
  private id = 0;
  private curso: Curso = new Curso();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private cursoService: CursoService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.turmaService.onChangeContext.emit(true);
    this.initForms();

    this.cursos$ = this.cursoService.list()
      .pipe(catchError(err => {
        this.dialog.open(ErrorLoadingComponent);
        this.cursoError$.next(true);
        return of([]);
      }));

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
            curso: this.turma.curso.id
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
      curso: [null, Validators.required],
    });

  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }

  private save(stepper: MatVerticalStepper, state): void {

    this.turma.sigla = this.formGroup01.controls.sigla.value;
    this.curso.id = this.formGroup01.controls.curso.value;
    this.turma.curso = this.curso;

    this.turmaService.save(this.turma)
      .subscribe(
        (data: Turma) => {
          if (!!state) {
            if (this.router.url.match('/edit')) {
              this.showUpdatedMessage();
            } else {
              this.showSavedMessage();
              this.router.navigate(['turmas/add']);
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

}
