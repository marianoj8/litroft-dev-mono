import { AdminInterno } from './../../shared/model/adminInterno';
import { Instituto } from './../../shared/model/instituto';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { Curso } from 'src/app/shared/model/curso';
import { Turma } from 'src/app/shared/model/turma';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';

import { TurmaService } from '../modules/turma.service';
import { CursoService } from './../../cursos/modules/curso.service';
import { MatDialog } from '@angular/material/dialog';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit {
  formGroup01: FormGroup;
  cursos$: Observable<Curso[]>;
  cursoError$ = new Subject<boolean>();
  error$ = new Subject<boolean>();
  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  turma: Turma = new Turma();
  private id = 0;
  private curso: Curso = new Curso();
  nivel: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private cursoService: CursoService,
    private notificationService: NotificationService,
    private dialogService: MatDialog,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.nivel = localStorage.getItem('nivel') === 'Ensino do II Ciclo';
    this.turmaService.onChangeContext.emit(true);
    this.initForms();

    this.cursos$ = this.cursoService.list()
      .pipe(catchError(err => {
        this.dialogService.open(ErrorLoadingComponent);
        this.cursoError$.next(true);
        return of([]);
      }));

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      const entityId = Number(localStorage.getItem('entityId'));
      this.turmaService.getById(this.id, entityId)
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
    if (this.nivel) {
      this.formGroup01 = this.formBuilder.group({
        sigla: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]],
        curso: [null, Validators.required],
      });
    } else {
      this.formGroup01 = this.formBuilder.group({
        sigla: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)]]
      });
    }
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }

  private save(stepper: MatVerticalStepper, state): void {

    this.turma.sigla = this.formGroup01.controls.sigla.value;
    if (this.nivel) {
      this.curso.id = this.formGroup01.controls.curso.value;
      this.turma.curso = this.curso;
      const adminInterno = new AdminInterno();
      adminInterno.instituto = new Instituto(Number.parseInt(localStorage.getItem('entityId'), 10));
      this.curso.adminInterno = adminInterno;
      this.turma.adminInterno = adminInterno;
    }

    this.turmaService.save(this.turma)
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
        (data: Turma) => {
          if (data !== null) {
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

}
