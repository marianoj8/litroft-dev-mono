import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs/operators';
import { of, Subject, Subscription } from 'rxjs';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { ProfessorService } from '../modules/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from 'src/app/shared/model/professor';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { ForbiddenErrorDialogComponent } from 'src/app/shared/forbidden-error-dialog/forbidden-error-dialog.component';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit, OnDestroy {

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
    'sexo',
    'telefone',
    'email',
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
