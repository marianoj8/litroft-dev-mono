import { CoordenadorService } from '../modules/coordenador.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject, Subscription, of, Subscriber, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { Coordenador } from 'src/app/shared/model/coordenador';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-coordenador-list',
  templateUrl: './coordenador-list.component.html',
  styleUrls: ['./coordenador-list.component.css']
})
export class CoordenadorListComponent implements OnInit, OnDestroy {

  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  coordenadores: MatTableDataSource<Coordenador>;
  coordenadoresList: Coordenador[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;
  private institutoId = Number.parseInt(localStorage.getItem('entityId'), 10);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'coordenador',
    'curso',
    'classe',
    'anoletivo',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: CoordenadorService,
    private notification: NotificationService,
    private dialogService: MatDialog,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(false);

    this.filtro.anoLetivo = '2020-2021';

    this.sub = this.service.findValueParams
      .subscribe(next => this.onRefrash(next));

    this.sub = this.service.findValueParam
      .subscribe(next => this.coordenadores.filter = next);

    this.onRefrash(this.filtro);

    this.sub = this.service.emitOnDetalheButtonCliked.subscribe(
      (next) => this.detalhe(next));

    this.sub = this.service.emitOnEditButtonCliked.subscribe(
      (next) => this.edit(next));

    this.sub = this.service.emitOnDeleteButtonCliked.subscribe(
      (next) => this.openDeleteDialog(next));

    // this.sub = this.service.findValueParamFromServer.subscribe(
    //   (next: CustomFilter) => this.onFilterFromServer(next));
  }

  // onFilterFromServer(data: CustomFilter) {
  //   this.sub = this.service.filterByNomeSexoEspecialidade(data)
  //     .subscribe(next => this.coordenadoresList = next);
  // }

  onRefrash(data?: CustomFilter) {
    this.sub = this.service.listAll(data, this.institutoId)
      .pipe(
        catchError(err => {

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
          const array = next.map((item: Coordenador) => {
            return {
              ...item
            };
          });
          this.coordenadores = new MatTableDataSource(array);
          this.coordenadores.sort = this.sort;
          this.coordenadoresList = this.coordenadores.data;
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
  edit(coordenador: Coordenador) {
    this.router.navigate(['edit', coordenador.id, 'instituto', coordenador.adminInterno.instituto.id], { relativeTo: this.activatedRoute });
  }


  openMoreOptionDialog(id: number) {

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'coordenador';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deletecoordenador(orientador);
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
        this.deletecoordenador(id);
      }

    });
  }

  deletecoordenador(orientadorId: number) {
    this.service.deleteById(orientadorId)
      .subscribe(
        () => {
          //   this.onRefrash(this.filtro);
          this.showDeletedMessage();
        },
        err => this.showErrorMessage()
      );
  }

  public showPerfil(): void {
    console.log('The Perfil');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
