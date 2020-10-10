import { MiniPautaService } from './../modules/mini-pauta.service';
import { MiniPauta } from 'src/app/shared/model/miniPauta';
import { Periodo } from './../../shared/model/periodo';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { Turma } from 'src/app/shared/model/turma';
import { MyErrorStateMatch } from 'src/app/shared/validators/field-validator';
import { Estudante } from 'src/app/shared/model/estudante';
import { Provincia } from 'src/app/shared/model/provincia';
import { Municipio } from 'src/app/shared/model/municipio';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EstudanteService } from 'src/app/estudantes/modules/estudante.service';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { TurmaService } from 'src/app/turmas/modules/turma.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { EventEmitter } from 'events';
import { PeriodoService } from 'src/app/periodos/modules/periodos.service';
import { ClasseService } from 'src/app/classe/modules/classe.service';
import { Classe } from 'src/app/shared/model/classe';
import { Diciplina } from 'src/app/shared/model/diciplina';
import { DiciplinaService } from 'src/app/diciplinas/modules/diciplina.service';
import { Instituto } from 'src/app/shared/model/instituto';

@Component({
  selector: 'app-mini-pauta-form',
  templateUrl: './mini-pauta-form.component.html',
  styleUrls: ['./mini-pauta-form.component.css']
})
export class MiniPautaFormComponent implements OnInit {

  formGroup01: FormGroup;
  formGroup02: FormGroup;
  formGroup03: FormGroup;
  formGroup04: FormGroup;
  formGroup05: FormGroup;
  cursos: Curso[];
  turmas: Turma[];
  cursoError$ = new Subject<boolean>();
  turmaError$ = new Subject<boolean>();
  periodos$: Observable<Periodo[]>;
  classes: Classe[];
  diciplinas$: Observable<Diciplina[]>;
  estudanteError$ = new Subject<boolean>();

  matcher = new MyErrorStateMatch();
  showAndHideView: EventEmitter = new EventEmitter();
  private miniPauta: MiniPauta;
  estudante: Estudante = new Estudante();
  estudante$: Observable<Estudante[]>;
  private curso: Curso = new Curso();
  private turma: Turma = new Turma();
  private provincia: Provincia = new Provincia();
  private municipio: Municipio = new Municipio();
  filter = new CustomFilter();
  private id = 0;
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);

  private valor1 = 0;
  private valor2 = 0;
  private valorMedia1: number;

  private valor3 = 0;
  private valor4 = 0;
  private valorMedia2: number;

  private valor5 = 0;
  private valor6 = 0;
  private valorMedia3: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private miniPautaService: MiniPautaService,
    private estudanteService: EstudanteService,
    private cursoSerice: CursoService,
    private cursoService: CursoService,
    private classeService: ClasseService,
    private turmaService: TurmaService,
    private diciplinaService: DiciplinaService,
    private notificationService: NotificationService,
    private dialogService: MatDialog,
    private location: Location,
    public monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.miniPautaService.onChangeContext.emit(true);
    this.initForms();
    this.cursoService.list(this.entityId).subscribe((onValue) => {
      this.cursos = onValue;
    });
    this.classeService.list().subscribe((onValue) => {
      this.classes = onValue;
    });
    this.turmaService.list(this.entityId).subscribe((value) => this.turmas = value);
    this.miniPauta = new MiniPauta();


    if (false) {
      this.estudante$ = this.estudanteService.filterBySexoAndCurso(this.filter.curso === undefined ? '' : this.filter.curso, this.filter.sexo === undefined ? '' : this.filter.sexo, this.entityId)
        .pipe(
          catchError((err: HttpErrorResponse) => {

            if (err.status === 403) {
              this.dialogService.open(ForbiddenErrorDialogComponent);
              return of(null);
            }
          })
        );

    } else {
      this.estudante$ = this.estudanteService.filterByNomeSexoTurma(this.filter, this.entityId)
        .pipe(
          catchError((err: HttpErrorResponse) => {

            if (err.status === 403) {
              this.dialogService.open(ForbiddenErrorDialogComponent);
              return of(null);
            }
          })
        );

      this.formGroup02.controls.estudante.valueChanges
        .subscribe((onValue) => this.estudanteService.getById(onValue, this.entityId)
          .subscribe((onNewValue: Estudante) => {
            this.estudante = onNewValue;
            this.filter.institutoId = onNewValue.adminInterno.instituto.id;
            this.filter.nome = '';
            this.diciplinas$ = this.diciplinaService.list(this.filter, this.entityId);

          }));

    }

    this.cursoSerice.list(this.entityId)
      .pipe(catchError(err => {
        this.dialogService.open(ErrorLoadingComponent);
        this.cursoError$.next(true);
        return of([]);
      })).subscribe((onValue) => {
        this.cursos = onValue;
      });

    this.formGroup03.controls.p1.valueChanges
      .subscribe((onValue: number) => {
        this.valor1 = onValue;
        this.miniPauta.p1 = onValue;
        this.formGroup03.patchValue({
          media: this.mediaCalc1()
        });
      });

    this.formGroup03.controls.p2.valueChanges
      .subscribe((onValue: number) => {
        this.valor2 = onValue;
        this.miniPauta.p2 = onValue;
        this.formGroup03.patchValue({
          media: this.mediaCalc1()
        });
      });

    this.formGroup04.controls.p1.valueChanges
      .subscribe((onValue: number) => {
        this.valor3 = onValue;
        this.formGroup04.patchValue({
          media: this.mediaCalc2()
        });
      });

    this.formGroup04.controls.p2.valueChanges
      .subscribe((onValue: number) => {
        this.valor4 = onValue;
        this.formGroup04.patchValue({
          media: this.mediaCalc2()
        });
      });

    this.formGroup05.controls.p1.valueChanges
      .subscribe((onValue: number) => {
        this.valor5 = onValue;
        this.formGroup05.patchValue({
          media: this.mediaCalc3()
        });
      });

    this.formGroup05.controls.p2.valueChanges
      .subscribe((onValue: number) => {
        this.valor6 = onValue;
        this.formGroup05.patchValue({
          media: this.mediaCalc3()
        });
      });

    this.formGroup01.controls.curso.valueChanges
      .subscribe((onValue: number) => {
        this.filter.cursoId = onValue;
        this.filter.classeId = onValue;
        this.turmaService.filterByCursoAndClasse(this.filter, this.entityId)
          .subscribe();
      });

    this.formGroup01.controls.classe.valueChanges
      .subscribe((onValue: number) => {
        this.filter.classeId = onValue;
        this.turmaService.filterByCursoAndClasse(this.filter, this.entityId)
          .subscribe((value) => this.turmas = value);
      });

    if (this.router.url.match('/edit')) {
      this.activatedRoute.params
        .subscribe(data => {
          this.id = data.id;
        });

      this.miniPautaService.getMiniPautaById(this.id, this.entityId)
        .subscribe(data => {
          this.miniPauta = data;

          this.formGroup01.patchValue({
            curso: this.miniPauta.curso.id,
            classe: this.miniPauta.classe.id,
            turma: this.miniPauta.turma.id
          });

          this.formGroup02.patchValue({
            estudante: this.miniPauta.estudante.id,
            diciplina: this.miniPauta.diciplina.id
          });

          this.formGroup03.patchValue({
            p1: this.miniPauta.p1,
            p2: this.miniPauta.p2,
            media: this.miniPauta.m1
          });

          this.formGroup04.patchValue({
            p1: this.miniPauta.p3,
            p2: this.miniPauta.p4,
            media: this.miniPauta.m2
          });

          this.formGroup05.patchValue({
            p1: this.miniPauta.p5,
            p2: this.miniPauta.p6,
            media: this.miniPauta.m3
          });
        });
    }
  }

  initForms() {

    this.formGroup01 = this.formBuilder.group({
      curso: [null, Validators.required],
      classe: [null, Validators.required],
      turma: [null, Validators.required]
    });

    this.formGroup02 = this.formBuilder.group({
      estudante: [null, Validators.required],
      diciplina: [null, Validators.required]
    });

    this.formGroup03 = this.formBuilder.group({
      p1: [null, [Validators.min(0), Validators.max(20)]],
      p2: [null, [Validators.min(0), Validators.max(20)]],
      media: [null, [Validators.min(0), Validators.max(20)]]
    });

    this.formGroup04 = this.formBuilder.group({
      p1: [null, [Validators.min(0), Validators.max(20)]],
      p2: [null, [Validators.min(0), Validators.max(20)]],
      media: [null, [Validators.min(0), Validators.max(20)]]
    });

    this.formGroup05 = this.formBuilder.group({
      p1: [null, [Validators.min(0), Validators.max(20)]],
      p2: [null, [Validators.min(0), Validators.max(20)]],
      media: [null, [Validators.min(0), Validators.max(20)]]
    });
  }

  onSaveButton(stepper: MatVerticalStepper) {
    this.save(stepper, false);
  }

  onSaveButtonAndList(stepper: MatVerticalStepper) {
    this.save(stepper, true);
  }


  private mediaCalc1(): number {
    this.valorMedia1 = Math.round((this.valor1 + this.valor2) / 2);
    return this.valorMedia1;
  }

  private mediaCalc2(): number {
    this.valorMedia2 = Math.round((this.valor3 + this.valor4) / 2);
    return this.valorMedia2;
  }

  private mediaCalc3(): number {
    this.valorMedia3 = Math.round((this.valor5 + this.valor6) / 2);
    return this.valorMedia3;
  }

  private save(stepper: MatVerticalStepper, state): void {

    this.miniPauta.curso = new Curso(this.formGroup01.controls.curso.value);
    this.miniPauta.classe = new Classe(this.formGroup01.controls.classe.value);
    this.miniPauta.turma = new Turma(this.formGroup01.controls.turma.value);

    this.miniPauta.estudante = new Estudante(this.estudante.id);
    this.miniPauta.diciplina = new Diciplina(this.formGroup02.controls.diciplina.value);

    this.miniPauta.p1 = this.formGroup03.controls.p1.value;
    this.miniPauta.p2 = this.formGroup03.controls.p2.value;
    this.miniPauta.m1 = this.formGroup03.controls.media.value;

    this.miniPauta.p3 = this.formGroup04.controls.p1.value;
    this.miniPauta.p4 = this.formGroup04.controls.p2.value;
    this.miniPauta.m2 = this.formGroup04.controls.media.value;

    this.miniPauta.p5 = this.formGroup05.controls.p1.value;
    this.miniPauta.p6 = this.formGroup05.controls.p2.value;
    this.miniPauta.m3 = this.formGroup05.controls.media.value;

    console.log(this.miniPauta);


    this.miniPauta.instituto = new Instituto(this.estudante.adminInterno.instituto.id);
    if (this.estudante.curso) {
      this.miniPauta.curso = this.estudante.curso;
    }

    this.miniPautaService.save(this.miniPauta)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err);
      }))
      .subscribe(
        (data: MiniPauta) => {
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

  private resolveDateFormat(): string {
    // tslint:disable-next-line: prefer-const
    let date = new Date(this.formGroup02.controls.dataNascimento.value).toISOString().slice(0, 10);
    // tslint:disable-next-line: prefer-const
    let ano: number = Number(date.substring(-1, 4));
    // tslint:disable-next-line: prefer-const
    let mes: number = Number(date.substring(5, 7));
    // tslint:disable-next-line: prefer-const
    let dia: number = Number(date.substring(8, 10));
    let finalDate = '';

    if (dia >= 0 && dia < 31) {
      finalDate = `${ano}-${mes}-${dia + 1}`;
    } else if (dia === 31) {
      finalDate = `${ano}-${mes + 1}-${1}`;
    }

    return finalDate;
  }

  back() {
    this.location.back();
  }
}
