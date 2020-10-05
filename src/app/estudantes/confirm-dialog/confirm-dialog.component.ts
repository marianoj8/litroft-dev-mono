import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { EstudanteService } from './../modules/estudante.service';
import { Estudante } from './../../shared/model/estudante';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { catchError, debounceTime } from 'rxjs/operators';
import { TurmaService } from './../../turmas/modules/turma.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Turma } from 'src/app/shared/model/turma';
import { MatriculaService } from 'src/app/matricula/modules/matricula.service';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDailogParamEstudante } from 'src/app/shared/model/support/mat-dialog-param-estudante';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  private filter: CustomFilter = new CustomFilter();
  turmas: Turma[];
  years = [];
  currentYear = 2020;
  totalAluno: number;
  private estudante: Estudante;
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);
  public showProgress = true;
  public searchTurma = '';
  formAnoLetivo: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: MatDailogParamEstudante,
    private dialogService: MatDialog,
    private turmaService: TurmaService,
    private estudanteService: EstudanteService,
    private matriculaService: MatriculaService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.init();
    for (let i = 2008; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }

    this.formAnoLetivo = this.formBuilder.group({
      ano: [new Date().getFullYear()],
      textSearch: ['']
    });
  }

  init() {
    this.filter.cursoId = this.data.curso.id;
    this.filter.classeId = this.data.classe.id;
    this.turmaService.filterByCursoAndClasse(this.filter, this.entityId)
      .subscribe((onValue: Turma[]) => {
        this.turmas = onValue;
        this.showProgress = false;
        this.countEstudante(this.turmas);
      });


    this.estudanteService.getById(this.data.id, this.entityId)
      .subscribe((onValue) => this.estudante = onValue);
  }

  public seach(key: string) {
    this.filter.sigla = key;
    this.filter.cursoId = this.data.curso.id;
    this.filter.classeId = this.data.classe.id;
    this.turmaService.filterByCursoAndClasse(this.filter, this.entityId)
      .pipe(debounceTime(650))
      .subscribe((onValue) => {
        this.turmas = onValue;
        this.countEstudante(this.turmas);
      });
  }

  public confirm(turma: Turma): void {
    this.estudante.turma = turma;
    this.matriculaService.matericularConfirm(this.estudante)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
        this.showFailerMessage(err);
      }))
      .subscribe(d => {
      });
  }

  public countEstudante(turmas: Turma[]) {
    turmas.forEach((e, index) => {
      this.filter.cursoId = e.curso.id;
      this.filter.classeId = e.classe.id;
      this.filter.turmaId = e.id;
      this.filter.anoletivo = 2020;
      this.estudanteService.countByCursoAndTurma(this.filter, this.entityId)
        .pipe(catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.dialogService.open(ForbiddenErrorDialogComponent);
            return of(null);
          }
          this.showFailerMessage(err);
        }))
        .subscribe((onValue: number) => {
          if (turmas.length > 0) {
            turmas[index].totalAlunos = onValue;
          }
        });
    });
  }

  private showFailerMessage(err: HttpErrorResponse): void {
    this.notificationService
      .componentErrorMessage(':: ' + err.error.message);
  }

}
