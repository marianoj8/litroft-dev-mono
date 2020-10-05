import { MatDailogParamEstudante } from './../../shared/model/support/mat-dialog-param-estudante';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { Estudante } from 'src/app/shared/model/estudante';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { EstudanteService } from '../modules/estudante.service';
import { DeleteDialogComponent } from './../../shared/delete-dialog/delete-dialog.component';
import { CustomFilter } from './../../shared/model/support/custom-filter';
import { MoreOptionsDialogComponent } from './../../shared/more-options-dialog/more-options-dialog.component';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';

@Component({
  selector: 'app-estudante-list',
  templateUrl: './estudante-list.component.html',
  styleUrls: ['./estudante-list.component.css']
})
export class EstudanteListComponent implements OnInit, OnDestroy {

  public isPendente = false;
  public nivel = localStorage.getItem('nivel') === 'Ensino do II Ciclo';
  pageEvent: PageEvent;
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  dialogParamEstudante: MatDailogParamEstudante = new MatDailogParamEstudante();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  estudantes: MatTableDataSource<Estudante>;
  estudantesList: Estudante[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription[] = [];
  private entityId = Number.parseInt(localStorage.getItem('entityId'), 10);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'processo',
    'nome',
    'sexo',
    'turma',
    'curso',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: EstudanteService,
    private notification: NotificationService,
    private dialogService: MatDialog,
    public monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {

    this.filtro.nivelId = Number.parseInt(localStorage.getItem('nivelId'), 10);

    this.service.onChangeContext.emit(false);
    this.initTables();

    this.service.emitOnConfirmButtonCliked.subscribe((e) => {
      if (e) {
        this.initTables();
      }
    });
  }

  private initTables() {
    if (!this.router.url.includes('pendentes')) {
      if (this.nivel) {
        this.preparTableToList();
      } else {
        this.displaydColumns = [
          'processo',
          'nome',
          'sexo',
          'turma',
          'detalhe',
          'edit',
          'delete'
        ];
        this.preparTableToList();
      }
    }
    if (this.router.url.includes('pendentes')) {
      this.isPendente = true;
      if (this.nivel) {
        this.displaydColumns = [
          'nome',
          'sexo',
          'data',
          'curso',
          'classe',
          'periodo',
          'detalhe',
          'comfirm',
          'cancelar'
        ];
      } else {
        this.displaydColumns = [
          'nome',
          'sexo',
          'data',
          'classe',
          'periodo',
          'detalhe',
          'comfirm',
          'cancelar'
        ];
      }

      this.sub.push(this.service.findValueParams
        .subscribe(data => this.onFiltered(data)));

      this.sub.push(this.service.findValueParam
        .subscribe(data => this.estudantes.filter = data));

      this.filtro.turma = null;
      this.onRefrashPendente(this.filtro);
    }
  }

  onFilterFromServer(data: CustomFilter) {
    this.sub.push(this.service.filterByNomeSexoCurso(data, this.entityId)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.dialogService.open(ForbiddenErrorDialogComponent);
          return of(null);
        }
      }))
      .subscribe(
        next => this.estudantesList = next));
  }

  onRefrash(data?: CustomFilter) {
    this.sub.push(this.service.filterBySexoAndCurso(data.curso === undefined ? '' : data.curso, data.sexo === undefined ? '' : data.sexo, this.entityId)
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
        next => {
          const array = next.map((item: Estudante) => {
            return {
              ...item
            };

          });
          this.estudantes = new MatTableDataSource(array);
          this.estudantes.sort = this.sort;
          this.estudantesList = this.estudantes.data;
        }));
  }

  onRefrashTurma(data?: CustomFilter) {
    this.sub.push(this.service.filterByNomeSexoTurma(data, this.entityId)
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
        next => {
          const array = next.map((item: Estudante) => {
            return {
              ...item
            };

          });
          this.estudantes = new MatTableDataSource(array);
          this.estudantes.sort = this.sort;
          this.estudantesList = this.estudantes.data;
        }));
  }

  onRefrashPendente(data?: CustomFilter) {
    this.sub.push(this.service.filterByNomeSexoPendenteNivel(data, this.entityId)
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
        next => {
          const array = next.map((item: Estudante) => {
            return {
              ...item
            };

          });
          this.estudantes = new MatTableDataSource(array);
          this.estudantes.sort = this.sort;
          this.estudantesList = this.estudantes.data;
        }));
  }

  onFiltered(data?: CustomFilter) {
    if (data.anoletivoType === 1) {
      this.sub.push(this.service.filterByAllAtributsEntrada(data, this.entityId)
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
          next => {
            const array = next.map((item: Estudante) => {
              return {
                ...item
              };

            });
            this.estudantes = new MatTableDataSource(array);
            this.estudantes.sort = this.sort;
            this.estudantesList = this.estudantes.data;
          }));
    } else if (data.anoletivoType === 2) {
      this.sub.push(this.service.filterByAllAtributsFinalista(data, this.entityId)
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
          next => {
            const array = next.map((item: Estudante) => {
              return {
                ...item
              };

            });
            this.estudantes = new MatTableDataSource(array);
            this.estudantes.sort = this.sort;
            this.estudantesList = this.estudantes.data;
          }));
    } else {
      this.sub.push(this.service.filterByNomeSexoCursoPendente(data, this.entityId)
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
          next => {
            const array = next.map((item: Estudante) => {
              return {
                ...item
              };

            });
            this.estudantes = new MatTableDataSource(array);
            this.estudantes.sort = this.sort;
            this.estudantesList = this.estudantes.data;
          }));
    }
  }

  private showErrorMessage() {
    this.notification.componentLoadingFailedMessage();
  }
  private showDeletedMessage() {
    this.notification.componentDeletetedSuccessfulMessage();
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  detalhe(id: number) {
    this.router.navigate(['detalhe', id], { relativeTo: this.activatedRoute });
  }
  edit(id: number) {
    this.router.navigate(['estudantes/edit', id]);
  }



  openMoreOptionDialog(id: number) {

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'Estudante';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteEstudante(estudante);
      }

    });
  }

  openConfirmDialog(estudante: Estudante) {

    this.dialogParamEstudante.id = estudante.id;
    this.dialogParamEstudante.curso = estudante.curso;
    this.dialogParamEstudante.classe = estudante.classe;


    const dialogRef = this.dialogService.open(
      ConfirmDialogComponent,
      {
        data: this.dialogParamEstudante,
        height: '500px',
        width: '900px'
      });
  }

  private preparTableToList(): void {
    this.sub.push(this.service.findValueParams
      .subscribe(data => this.onFiltered(data)));

    this.sub.push(this.service.findValueParam
      .subscribe(data => this.estudantes.filter = data));

    if (this.nivel) {
      this.onRefrash(this.filtro);
    } else {
      this.onRefrashTurma(this.filtro);
    }

    this.sub.push(this.service.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next)));

    this.sub.push(this.service.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next)));

    this.sub.push(this.service.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next)));

    this.sub.push(this.service.findValueParamFromServer.subscribe(
      (next: CustomFilter) => this.onFilterFromServer(next)));
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialogService.open(
      DeleteDialogComponent,
      {
        data: id,
        height: '200px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteEstudante(id);
      }

    });
  }

  deleteEstudante(estudanteId: number) {
    this.service.deleteById(estudanteId)
      .subscribe(
        () => {
          this.onRefrash(this.filtro);
          this.showDeletedMessage();
        },
        err => this.showErrorMessage()
      );
  }

  private unsubscribe(): void {
    this.sub.forEach((e) => e.unsubscribe());
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
