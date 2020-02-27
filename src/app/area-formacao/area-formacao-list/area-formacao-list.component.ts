import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AreaFormacao } from 'src/app/shared/model/AreaFormacao';
import { Subject, Subscription, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { AreaFormacaoService } from '../modules/area-formacao.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-area-formacao-list',
  templateUrl: './area-formacao-list.component.html',
  styleUrls: ['./area-formacao-list.component.css']
})
export class AreaFormacaoListComponent implements OnInit, OnDestroy {
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  areaFormacoes: MatTableDataSource<AreaFormacao>;
  areaFormacoesList: AreaFormacao[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'descricao',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public areaFormacaoService: AreaFormacaoService,
    public monografiaService: MonografiaService,
    private notification: NotificationService,
    private dialogService: MatDialog) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.areaFormacaoService.onChangeContext.emit(false);

    this.sub = this.areaFormacaoService.findValueParams
      .subscribe(next => this.onRefrash(next));

    this.sub = this.areaFormacaoService.findValueParam
      .subscribe(next => this.areaFormacoes.filter = next);

    this.onRefrash(this.filtro);

    this.sub = this.areaFormacaoService.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next)
    );

    this.sub = this.areaFormacaoService.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next));

    this.sub = this.areaFormacaoService.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next));

    this.sub = this.areaFormacaoService.findValueParamFromServer.subscribe(
      (next: CustomFilter) => this.onFilterFromServer(next));
  }

  onFilterFromServer(data: CustomFilter) {
    this.sub = this.areaFormacaoService.filterByDescription(data).subscribe(
      next => this.areaFormacoesList = next);
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.areaFormacaoService.filterByDescription(data)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: AreaFormacao) => {
            return {
              ...item
            };

          });
          this.areaFormacoes = new MatTableDataSource(array);
          this.areaFormacoes.sort = this.sort;
          this.areaFormacoesList = this.areaFormacoes.data;
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
    this.dialogParam.entityName = 'AreaFormacao';

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
        this.deleteAreaFormacao(id);
      }

    });
  }

  deleteAreaFormacao(cursoId: number) {
    this.sub = this.areaFormacaoService.deleteById(cursoId)
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
