import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { of, Subscription, Subject } from 'rxjs';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Router, ActivatedRoute } from '@angular/router';
import { MiniPautaService } from '../modules/mini-pauta.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { MiniPauta } from 'src/app/shared/model/miniPauta';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';

@Component({
  selector: 'app-mini-pauta-list',
  templateUrl: './mini-pauta-list.component.html',
  styleUrls: ['./mini-pauta-list.component.css']
})
export class MiniPautaListComponent implements OnInit, OnDestroy {

  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  miniPautas: MatTableDataSource<MiniPauta>;
  miniPautasList: MiniPauta[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'nome',
    'diciplina',
    'p1',
    'p2',
    'm1',
    'p3',
    'p4',
    'm2',
    'p5',
    'p6',
    'm3',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: MiniPautaService,
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
      .subscribe(next => this.miniPautas.filter = next);

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
    this.sub = this.service.getMiniPautaByProfessor('').subscribe(
      next => this.miniPautasList = next);
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.service.getMiniPautaByProfessor('')
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
          const array = next.map((item: MiniPauta) => {
            return {
              ...item
            };

          });
          this.miniPautas = new MatTableDataSource(array);
          this.miniPautas.sort = this.sort;
          this.miniPautasList = this.miniPautas.data;
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
    this.dialogParam.entityName = 'MiniPauta';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteMiniPauta(curso);
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
        this.deleteMiniPauta(id);
      }

    });
  }

  deleteMiniPauta(cursoId: number) {
    // this.service.deleteById(cursoId)
    //   .subscribe(
    //     () => {
    //       this.onRefrash(this.filtro);
    //       this.showDeletedMessage();
    //     },
    //     err => this.showErrorMessage()
    //   );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
