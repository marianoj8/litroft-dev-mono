import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Subscription, Subject, of } from 'rxjs';
import { Especialidade } from 'src/app/shared/model/especialidade';
import { Router, ActivatedRoute } from '@angular/router';
import { EspecialidadeService } from '../modules/especialidade.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.component.html',
  styleUrls: ['./especialidade-list.component.css']
})
export class EspecialidadeListComponent implements OnInit {

  pageEvent: PageEvent;
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  private subscribe: Subscription;
  especialidades: MatTableDataSource<Especialidade>;
  especialidadesList: Especialidade[] = [];
  error$ = new Subject<boolean>();



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'id',
    'nome',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: EspecialidadeService,
    private notification: NotificationService,
    private dialogService: MatDialog) { }

  ngOnInit() {
    this.service.onChangeContext.emit(false);
    this.subscribe = this.service.findValueParams
      .subscribe(data => this.onRefrash(data));
    this.subscribe = this.service.findValueParam
      .subscribe(data => this.especialidades.filter = data);
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
    this.subscribe = this.service.filterByNome(data).subscribe(
      data => this.especialidadesList = data
    );
  }

  onRefrash(data?: CustomFilter) {
    this.subscribe = this.service.filterByNome(data)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        data => {
          const array = data.map((item: Especialidade) => {
            return {
              ...item
            };

          });
          this.especialidades = new MatTableDataSource(array);
          this.especialidades.sort = this.sort;
          this.especialidadesList = this.especialidades.data;
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
    this.dialogParam.entityName = 'Especialidade';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteEspecialidade(curso);
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
        this.deleteEspecialidade(id);
      }

    });
  }

  deleteEspecialidade(cursoId: number) {
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
