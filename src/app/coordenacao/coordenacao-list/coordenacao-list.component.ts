import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject, Subscription, of, Subscriber, Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { ProfessorService } from 'src/app/professores/modules/professor.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';
import { Professor } from 'src/app/shared/model/professor';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-coordenacao-list',
  templateUrl: './coordenacao-list.component.html',
  styleUrls: ['./coordenacao-list.component.css']
})
export class CoordenacaoListComponent implements OnInit, OnDestroy {

  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  professores: MatTableDataSource<Professor>;
  professoresList: Professor[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'nome',
    'curso',
    'classe',
    'periodo',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public service: ProfessorService,
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
      .subscribe(next => this.professores.filter = next);

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
    this.sub = this.service.filterByNomeSexoEspecialidade(data)
      .subscribe(next => this.professoresList = next);
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.service.filterBySexoAndEspecialidade(data)
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
          const array = next.map((item: Professor) => {
            return {
              ...item
            };
          });
          this.professores = new MatTableDataSource(array);
          this.professores.sort = this.sort;
          this.professoresList = this.professores.data;
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
  edit(professor: Professor) {
    this.router.navigate(['edit', professor.id, 'instituto', professor.adminInterno.instituto.id], { relativeTo: this.activatedRoute });
  }


  openMoreOptionDialog(id: number) {

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'professor';

    const dialogRef = this.dialogService.open(
      MoreOptionsDialogComponent,
      {
        data: this.dialogParam,
        height: '280px',
        width: '360px'
      });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // this.deleteprofessor(orientador);
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
        this.deleteprofessor(id);
      }

    });
  }

  deleteprofessor(orientadorId: number) {
    this.service.deleteById(orientadorId)
      .subscribe(
        () => {
          this.onRefrash(this.filtro);
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
