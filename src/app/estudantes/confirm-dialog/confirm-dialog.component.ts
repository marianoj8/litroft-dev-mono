import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { EstudanteService } from './../modules/estudante.service';
import { Estudante } from './../../shared/model/estudante';
import { MatDailogTypeParam } from './../../shared/model/support/mat-dialog-type-param';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { TurmaService } from './../../turmas/modules/turma.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Turma } from 'src/app/shared/model/turma';
import { MatriculaService } from 'src/app/matricula/modules/matricula.service';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  turmas$: Observable<Turma[]>;
  private estudante$: Observable<Estudante>;
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: MatDailogTypeParam,
    private dialogService: MatDialog,
    private turmaService: TurmaService,
    private estudanteService: EstudanteService,
    private matriculaService: MatriculaService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.turmas$ = this.turmaService.list(this.entityId);
    this.estudante$ = this.estudanteService.getById(this.data.id);
  }

  public confirm(turma: Turma): void {
    this.estudante$.subscribe((onValue: Estudante) => {
      onValue.turma = turma;
      this.matriculaService.matericularConfirm(onValue)
        .pipe(catchError((err: HttpErrorResponse) => {
          if (err.status === 403) {
            this.dialogService.open(ForbiddenErrorDialogComponent);
            return of(null);
          }
          this.showFailerMessage(err);
        }))
        .subscribe(d => {
          console.log(d);
        });
    });
  }

  private showFailerMessage(err: HttpErrorResponse): void {
    this.notificationService
      .componentErrorMessage(':: ' + err.error.message);
  }

}
