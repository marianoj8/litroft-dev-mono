import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Local } from 'src/app/shared/model/local';
import { LocalService } from '../modules/local.service';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})
export class LocalListComponent implements OnInit {

  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;
  locais: MatTableDataSource<Local>;
  locaisList: Local[] = [];
  error$ = new Subject<boolean>();



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'distrito',
    'municipio',
    'provincia',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: LocalService,
    public monografiaService: MonografiaService,
    private notification: NotificationService,
    private dialogService: MatDialog) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(false);

    this.sub = this.service.findValueParams
      .subscribe(next => this.onRefrash(next));

    this.sub = this.service.findValueParam
      .subscribe(next => this.locais.filter = next);

    this.onRefrash(this.filtro);

    this.sub = this.service.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next)
    );

    this.sub = this.service.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next)
    );

    this.sub = this.service.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next)
    );

    this.sub = this.service.findValueParamFromServer.subscribe(
      (next: CustomFilter) => this.onFilterFromServer(next)
    );
  }

  onFilterFromServer(data: CustomFilter) {
    this.sub = this.service.filterByNome(data).subscribe(
      (next: Local[]) => this.locaisList = next
    );
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.service.filterByNome(data)
      .pipe(
        catchError(err => {
          console.log(err);

          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: Local) => {
            return {
              ...item
            };

          });
          this.locais = new MatTableDataSource(array);
          this.locais.sort = this.sort;
          this.locaisList = this.locais.data;
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
    this.dialogParam.entityName = 'Local';

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
        this.deleteLocal(id);
      }

    });
  }

  deleteLocal(cursoId: number) {
    this.service.deleteById(cursoId)
      .subscribe(
        () => {
          this.onRefrash(this.filtro);
          this.showDeletedMessage();
        },
        err => this.showErrorMessage()
      );
  }
}
