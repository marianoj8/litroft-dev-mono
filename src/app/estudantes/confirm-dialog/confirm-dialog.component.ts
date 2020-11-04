import { AnoLetivo } from './../../shared/model/support/AnoLetivo';
import { ConfigTable } from './../../shared/model/configtable';
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
import { ConfigService } from 'src/app/shared/config/modules/config.service';
import { AnoLetivoService } from 'src/app/ano-letivo/modules/ano-letivo.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  private filter: CustomFilter = new CustomFilter();
  turmas: Turma[];
  years: AnoLetivo[];
  currentYear = 2020;
  totalAluno: number;
  private estudante: Estudante;
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);
  public showProgress = true;
  public searchTurma = '';
  public config: ConfigTable = new ConfigTable();
  formanoLetivo: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: MatDailogParamEstudante,
    private dialogService: MatDialog,
    private turmaService: TurmaService,
    private anoLetivoService: AnoLetivoService,
    private estudanteService: EstudanteService,
    private matriculaService: MatriculaService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.init();

    this.anoLetivoService.list('').subscribe((e) => this.years = e);

    this.formanoLetivo = this.formBuilder.group({
      ano: [new Date().getFullYear()],
      textSearch: ['']
    });

    this.formanoLetivo.controls.ano.valueChanges
      .pipe(debounceTime(650))
      .subscribe((value) => {

        this.configService.getConfigByInstituto(this.entityId)
        .subscribe((onVlaue) => this.config = onVlaue);

        this.filter.anoLetivo = value;
        this.filter.cursoId = this.data.curso.id;
        this.filter.classeId = this.data.classe.id;
        this.turmaService.filterByCursoAndClasse(this.filter, this.entityId)

          .subscribe((onValue) => {
            this.turmas = onValue;
            this.countEstudante(this.turmas);
          });
      });

    this.formanoLetivo.controls.textSearch.valueChanges
      .pipe(debounceTime(650))
      .subscribe((value) => {

        this.configService.getConfigByInstituto(this.entityId)
        .subscribe((onVlaue) => this.config = onVlaue);

        this.filter.sigla = value;
        this.filter.cursoId = this.data.curso.id;
        this.filter.classeId = this.data.classe.id;
        this.turmaService.filterByCursoAndClasse(this.filter, this.entityId)

          .subscribe((onValue) => {
            this.turmas = onValue;
            this.countEstudante(this.turmas);
          });
      });
  }

  init() {

    this.configService.getConfigByInstituto(this.entityId)
      .subscribe((onVlaue) => this.config = onVlaue);

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
        this.showSavedMessage();
        this.estudanteService.emitOnConfirmButtonCliked.emit(true);
      });
  }

  public countEstudante(turmas: Turma[]) {
    turmas.forEach((e, index) => {
      this.filter.cursoId = e.curso.id;
      this.filter.classeId = e.classe.id;
      this.filter.turmaId = e.id;
      this.filter.anoLetivo = this.filter.anoLetivo;
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
  private showSavedMessage(): void {
    this.notificationService.componentSavedSuccessfulMessage();
  }
}
