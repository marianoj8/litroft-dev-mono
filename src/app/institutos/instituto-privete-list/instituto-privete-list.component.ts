import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Subscription, Subject, of } from 'rxjs';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Curso } from 'src/app/shared/model/curso';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { catchError } from 'rxjs/operators';
import { ErrorLoadingComponent } from 'src/app/shared/error-loading/error-loading.component';
import { MoreOptionsDialogComponent } from 'src/app/shared/more-options-dialog/more-options-dialog.component';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { Instituto } from 'src/app/shared/model/instituto';
import { InstitutoService } from '../modules/instituto.service';
import { Departamento } from 'src/app/shared/model/departamento';

@Component({
  selector: 'app-instituto-privete-list',
  templateUrl: './instituto-privete-list.component.html',
  styleUrls: ['./instituto-privete-list.component.css']
})
export class InstitutoPriveteListComponent implements OnInit {


  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;
  institutos: MatTableDataSource<Instituto>;
  institutosList: Instituto[] = [];
  cursosList: Curso[] = [];
  error$ = new Subject<boolean>();



  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'sigla',
    'nome',
    'formacao',
    'cursos',
    'localizacao',
    'detalhe',
    'edit',
    'delete'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: InstitutoService,
    private monografiaService: MonografiaService,
    private notification: NotificationService,
    private dialogService: MatDialog) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.service.onChangeContext.emit(false);

    this.sub = this.service.findValueParams
      .subscribe(next => this.onRefrash(next));

    // this.sub = this.service.findValueParam
    //   .subscribe(next => this.cursos.filter = next);

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

    // this.sub = this.service.findValueParamFromServer.subscribe(
    //   (next: CustomFilter) => this.onFilterFromServer(next)
    // );
  }

  // onFilterFromServer(data: CustomFilter) {
  //   this.sub = this.service.filterByNomeDuracao(data).subscribe(
  //     (next: Curso[]) => this.cursosList = next
  //   );
  // }

  onRefrash(data?: CustomFilter) {
    this.sub = this.service.list()
      .pipe(
        catchError(err => {
          // this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: Departamento) => {
            return {
              ...item
            };

          });
          this.institutos = new MatTableDataSource(array);
          this.institutos.sort = this.sort;
          this.institutosList = this.institutos.data;
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

  detalhe(id: Instituto) {
    this.router.navigate(['detalhe', id], { relativeTo: this.activatedRoute });
  }

  edit(instituto: Instituto) {
    this.router.navigate(['institutos/edit', instituto.id]);
  }

  OnDestroy() {
    this.sub.unsubscribe();
  }

  openMoreOptionDialog(id: number) {

    this.dialogParam.id = id;
    this.dialogParam.entityName = 'Curso';

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
        this.deleteCurso(id);
      }

    });
  }

  deleteCurso(cursoId: number) {
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
