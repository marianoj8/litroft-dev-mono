import { AnoLetivo } from 'src/app/shared/model/support/AnoLetivo';
import { Professor } from './../../shared/model/professor';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

import { ClasseService } from 'src/app/classe/modules/classe.service';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { Classe } from 'src/app/shared/model/classe';
import { Curso } from 'src/app/shared/model/curso';
import { Coordenador } from 'src/app/shared/model/coordenador';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { CoordenadorService } from '../modules/coordenador.service';
import { ProfessorService } from 'src/app/professores/modules/professor.service';
import { AnoLetivoService } from 'src/app/ano-letivo/modules/ano-letivo.service';
import { AdminInterno } from 'src/app/shared/model/adminInterno';

@Component({
  selector: 'app-coordenador-form',
  templateUrl: './coordenador-form.component.html',
  styleUrls: ['./coordenador-form.component.css']
})
export class CoordenadorFormComponent implements OnInit {

  formGroup01: FormGroup;
  formGroup02: FormGroup;
  professores$: Observable<Professor[]>;
  cursos$: Observable<Curso[]>;
  classes$: Observable<Classe[]>;
  anoLetivos$: Observable<AnoLetivo[]>;
  coordenadorError$ = new Subject<boolean>();
  cursoError$ = new Subject<boolean>();
  private institutoId = Number.parseInt(localStorage.getItem('entityId'), 10);
  private nivelId = Number.parseInt(localStorage.getItem('nivelId'), 10);

  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  coordenador: Coordenador = new Coordenador();
  private curso: Curso = new Curso();
  private classe: Classe = new Classe();
  private id = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private coordenadorService: CoordenadorService,
    private professorSerice: ProfessorService,
    private cursoSerice: CursoService,
    private classeSerice: ClasseService,
    private anoLetivoSerice: AnoLetivoService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.coordenadorService.onChangeContext.emit(true);
    this.initForms();

    this.professores$ = this.professorSerice.list(this.institutoId);
    this.classes$ = this.classeSerice.listClasseByNivelId(this.nivelId);
    this.anoLetivos$ = this.anoLetivoSerice.list('');

    this.cursos$ = this.cursoSerice.list(this.institutoId)
      .pipe(catchError(err => {
        // console.log(err);
        this.dialog.open(ErrorLoadingComponent);
        this.cursoError$.next(true);
        return of([]);
      }));

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.coordenadorService.getById(this.id, this.institutoId)
        .subscribe(data => {
          this.coordenador = data;

          this.formGroup01.patchValue({
            professor: this.coordenador.professor,
            curso: this.coordenador.curso
          });

          this.formGroup02.patchValue({
            classe: this.coordenador.classe,
            anoLetivo: this.coordenador.anoLetivo
          });
        });

    }
  }

  initForms() {
    this.formGroup01 = this.formBuilder.group({
      professor: [null, Validators.required],
      curso: [null, Validators.required],
    });

    this.formGroup02 = this.formBuilder.group({
      classe: [null, Validators.required],
      anoLetivo: [null, Validators.required]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }

  private save(stepper: MatVerticalStepper, state): void {

    this.coordenador.professor = new Professor(this.formGroup01.controls.professor.value);
    this.coordenador.curso = new Curso(this.formGroup01.controls.curso.value);
    this.coordenador.classe = new Classe(this.formGroup02.controls.classe.value);
    this.coordenador.anoLetivo = new AnoLetivo(this.formGroup02.controls.anoLetivo.value);

    this.coordenadorService.save(this.coordenador)
      .subscribe(
        (data: Coordenador) => {
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


