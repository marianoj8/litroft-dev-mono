import { EstudanteService } from './../modules/estudante.service';
import { Estudante } from './../../shared/model/estudante';
import { MatDailogTypeParam } from './../../shared/model/support/mat-dialog-type-param';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { TurmaService } from './../../turmas/modules/turma.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Turma } from 'src/app/shared/model/turma';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  turmas$: Observable<Turma[]>;
  private estudante$: Observable<Estudante>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: MatDailogTypeParam,
    private turmaService: TurmaService,
    private estudanteService: EstudanteService
  ) {

  }

  ngOnInit(): void {
    this.turmas$ = this.turmaService.list();
    this.estudante$ = this.estudanteService.getById(this.data.id);
  }

  public confirm(turma: Turma): void {

  }

}
