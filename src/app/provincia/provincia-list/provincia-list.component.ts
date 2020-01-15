import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { Provincia } from 'src/app/shared/model/provincia';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { catchError } from 'rxjs/operators';
import { of, Subscription, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProvinciaService } from '../modules/provincia.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';

@Component({
  selector: 'app-provincia-list',
  templateUrl: './provincia-list.component.html',
  styleUrls: ['./provincia-list.component.css']
})
export class ProvinciaListComponent implements OnInit {

  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  provincias: MatTableDataSource<Provincia>;
  provinciasList: Provincia[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'nome',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: ProvinciaService,
    private notification: NotificationService,
    private dialogService: MatDialog,
    public monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(false);
    this.sub = this.service.findValueParams
      .subscribe(next => this.onRefrash(next));

    this.sub = this.service.findValueParam
      .subscribe(next => this.provincias.filter = next);

    this.onRefrash(this.filtro);

    this.sub = this.service.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next));

    this.sub = this.service.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next));

    this.sub = this.service.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next));

    this.sub = this.service.findValueParamFromServer.subscribe(
      (next: CustomFilter) => this.onFilterFromServer(next));
  }

  onFilterFromServer(data: CustomFilter) {
    this.sub = this.service.filterByNome(data).subscribe(
      next => this.provinciasList = next);
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.service.filterByNome(data)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: Provincia) => {
            return {
              ...item
            };

          });
          this.provincias = new MatTableDataSource(array);
          this.provincias.sort = this.sort;
          this.provinciasList = this.provincias.data;
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


  openMoreOptionDialog(id: number) {

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'Provincia';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteProvincia(curso);
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
        this.deleteProvincia(id);
      }

    });
  }

  deleteProvincia(cursoId: number) {
    this.service.deleteById(cursoId)
      .subscribe(
        () => {
          this.onRefrash(this.filtro);
          this.showDeletedMessage();
        },
        err => this.showErrorMessage()
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
