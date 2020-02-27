import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminInterno } from 'src/app/shared/model/adminInterno';
import { Subject, Subscription, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { AdminInternoService } from '../modules/adminInterno.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-admin-interno-list',
  templateUrl: './admin-interno-list.component.html',
  styleUrls: ['./admin-interno-list.component.css']
})
export class AdminInternoListComponent implements OnInit, OnDestroy {

  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  adminInternos: MatTableDataSource<AdminInterno>;
  adminInternosList: AdminInterno[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'nome',
    'sexo',
    'instituto',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public adminInternoService: AdminInternoService,
    private notification: NotificationService,
    private dialogService: MatDialog,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.adminInternoService.onChangeContext.emit(false);

    this.sub = this.adminInternoService.findValueParams
      .subscribe(next => this.onRefrash(next));

    this.sub = this.adminInternoService.findValueParam
      .subscribe(next => this.adminInternos.filter = next);

    this.onRefrash(this.filtro);

    this.sub = this.adminInternoService.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next));

    this.sub = this.adminInternoService.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next));

    this.sub = this.adminInternoService.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next));

    this.sub = this.adminInternoService.findValueParamFromServer.subscribe(
      (next: CustomFilter) => this.onFilterFromServer(next));

  }

  onFilterFromServer(data: CustomFilter) {
    this.sub = this.adminInternoService.filterByNomeSexo(data)
      .subscribe(next => this.adminInternosList = next);
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.adminInternoService.filterByNomeSexo(data)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: AdminInterno) => {
            return {
              ...item
            };
          });
          this.adminInternos = new MatTableDataSource(array);
          this.adminInternos.sort = this.sort;
          this.adminInternosList = this.adminInternos.data;
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
    this.dialogParam.entityName = 'AdminInterno';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteAdminInterno(orientador);
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
        this.deleteAdminInterno(id);
      }

    });
  }

  deleteAdminInterno(orientadorId: number) {
    this.adminInternoService.deleteById(orientadorId)
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
