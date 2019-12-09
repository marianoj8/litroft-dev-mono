import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Subscription, Subject, of } from 'rxjs';
import { Turma } from 'src/app/shared/model/turma';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from '../modules/turma.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit, OnDestroy {

  pageEvent: PageEvent;
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  turmas: MatTableDataSource<Turma>;
  turmasList: Turma[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'sigla',
    'curso',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: TurmaService,
    private notification: NotificationService,
    private dialogService: MatDialog,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(false);

    this.sub = this.service.findValueParams
      .subscribe(next => this.onRefrash(next));

    this.sub = this.service.findValueParam
      .subscribe(next => this.turmas.filter = next);

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
    this.sub = this.service.filterByNome(data).subscribe(
      next => this.turmasList = next);
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
          const array = next.map((item: Turma) => {
            return {
              ...item
            };

          });
          this.turmas = new MatTableDataSource(array);
          this.turmas.sort = this.sort;
          this.turmasList = this.turmas.data;
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
    this.dialogParam.entityName = 'Turma';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteTurma(curso);
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
        this.deleteTurma(id);
      }

    });
  }

  deleteTurma(cursoId: number) {
    this.service.deleteById(cursoId)
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
