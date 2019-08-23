import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Estudante } from 'src/app/shared/model/estudante';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

import { EstudanteService } from '../modules/estudante.service';
import { DeleteDialogComponent } from './../../shared/delete-dialog/delete-dialog.component';
import { CustomFilter } from './../../shared/model/support/custom-filter';
import { MoreOptionsDialogComponent } from './../../shared/more-options-dialog/more-options-dialog.component';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';

@Component({
  selector: 'app-estudante-list',
  templateUrl: './estudante-list.component.html',
  styleUrls: ['./estudante-list.component.css']
})
export class EstudanteListComponent implements OnInit {

  // Paginator
  length = 100;
  pageSize = 100;
  pageSizeOptions: number[] = [5, 10, 100];

  pageEvent: PageEvent;

  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  private subscribe: Subscription;
  estudantes: MatTableDataSource<Estudante>;
  estudantesList: Estudante[] = [];
  error$ = new Subject<boolean>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'id',
    'nome',
    'sobrenome',
    'sexo',
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
    private dialogService: MatDialog) { }

  ngOnInit() {
    this.service.onChangeContext.emit(false);
    this.subscribe = this.service.findValueParams
      .subscribe(data => this.onRefrash(data));
    this.subscribe = this.service.findValueParam
      .subscribe(data => this.estudantes.filter = data);
    this.onRefrash(this.filtro);
    this.subscribe = this.service.emitOnDetalheButtonCliked.subscribe(
      (data) => this.detalhe(data)
    );
    this.subscribe = this.service.emitOnEditButtonCliked.subscribe(
      (data) => this.edit(data)
    );
    this.subscribe = this.service.emitOnDeleteButtonCliked.subscribe(
      (data) => this.openDeleteDialog(data)
    );
    this.subscribe = this.service.findValueParamFromServer.subscribe(
      (data: CustomFilter) => this.onFilterFromServer(data)
    );
  }

  onFilterFromServer(data: CustomFilter) {
    this.subscribe = this.service.filterByNomeSexoCurso(data).subscribe(
      data => this.estudantesList = data
    );
  }

  onRefrash(data?: CustomFilter) {
    this.subscribe = this.service.filterBySexoAndCurso(data.curso === undefined ? '' : data.curso, data.sexo === undefined ? '' : data.sexo)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        data => {
          const array = data.map((item: Estudante) => {
            return {
              ...item
            };

          });
          this.estudantes = new MatTableDataSource(array);
          this.estudantes.sort = this.sort;
          this.estudantesList = this.estudantes.data;
        });
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
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  OnDestroy() {
    this.subscribe.unsubscribe();
  }

  openMoreOptionDialog(id: number) {
    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: id,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteEstudante(estudante);
      }

    });
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

}
