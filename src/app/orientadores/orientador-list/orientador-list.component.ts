import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Subscription, Subject, of } from 'rxjs';
import { MatTableDataSource, PageEvent, MatSort, MatDialog } from '@angular/material';
import { Orientador } from 'src/app/shared/model/orientador';
import { Router, ActivatedRoute } from '@angular/router';
import { OrientadorService } from '../modules/OrientadorService.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { catchError } from 'rxjs/operators';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';

@Component({
  selector: 'app-orientador-list',
  templateUrl: './orientador-list.component.html',
  styleUrls: ['./orientador-list.component.css']
})
export class OrientadorListComponent implements OnInit {

  pageEvent: PageEvent;
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  private subscribe: Subscription;
  orientadores: MatTableDataSource<Orientador>;
  orientadoresList: Orientador[] = [];
  error$ = new Subject<boolean>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'id',
    'nome',
    'sobrenome',
    'sexo',
    'telefone',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: OrientadorService,
    private notification: NotificationService,
    private dialogService: MatDialog) { }

  ngOnInit() {
    this.service.onChangeContext.emit(false);
    this.subscribe = this.service.findValueParams
      .subscribe(data => this.onRefrash(data));
    this.subscribe = this.service.findValueParam
      .subscribe(data => this.orientadores.filter = data);
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
    this.subscribe = this.service.filterByNomeSexoEspecialidade(data).subscribe(
      data => this.orientadoresList = data
    );
  }

  onRefrash(data?: CustomFilter) {
    this.subscribe = this.service.filterBySexoAndEspecialidade(data.sexo === undefined ? '' : data.sexo, data.descricao === undefined ? '' : data.descricao)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        data => {
          const array = data.map((item: Orientador) => {
            return {
              ...item
            };

          });
          this.orientadores = new MatTableDataSource(array);
          this.orientadores.sort = this.sort;
          this.orientadoresList = this.orientadores.data;
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

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'Orientador';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteOrientador(orientador);
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
        this.deleteOrientador(id);
      }

    });
  }

  deleteOrientador(orientadorId: number) {
    this.service.deleteById(orientadorId)
      .subscribe(
        () => {
          this.onRefrash(this.filtro);
          this.showDeletedMessage();
        },
        err => this.showErrorMessage()
      );
  }

}
