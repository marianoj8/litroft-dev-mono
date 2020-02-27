import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { GrupoService } from './../modules/grupo.service';
import { Grupo } from 'src/app/shared/model/grupo';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.css']
})
export class GrupoListComponent implements OnInit, OnDestroy {
  pageEvent: PageEvent;
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  grupos: MatTableDataSource<Grupo>;
  gruposList: Grupo[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'posicao',
    'descricao',
    'area',
    'curso',
    'turma',
    'anoLetivo',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: GrupoService,
    private notification: NotificationService,
    private dialogService: MatDialog,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(false);

    this.sub = this.service.findValueParams
      .subscribe((value: CustomFilter) => this.onRefrash(value));

    this.sub = this.service.findValueParam
      .subscribe(next => this.grupos.filter = next);

    this.onRefrash(this.filtro);

    this.sub = this.service.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next)
    );

    this.sub = this.service.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next));

    this.sub = this.service.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next));

    this.sub = this.service.findValueParamFromServer.subscribe(
      (next: CustomFilter) => this.onFilterFromServer(next));
  }

  onFilterFromServer(data: CustomFilter) {
    this.sub = this.service.filterByDescricaoAndTow(data).subscribe(
      next => this.gruposList = next);
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.service.listByDescricao(data.descricao)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: Grupo) => {
            return {
              ...item
            };

          });
          this.grupos = new MatTableDataSource(array);
          this.grupos.sort = this.sort;
          this.gruposList = this.grupos.data;
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
    this.sub.unsubscribe();
  }

  openMoreOptionDialog(id: number) {

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'Grupo';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
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
        this.deleteGrupo(id);
      }

    });
  }

  deleteGrupo(cursoId: number) {
    this.sub = this.service.deleteById(cursoId)
      .subscribe(
        () => {
          this.onRefrash(this.filtro);
          this.showDeletedMessage();
        },
        err => this.showErrorMessage()
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
