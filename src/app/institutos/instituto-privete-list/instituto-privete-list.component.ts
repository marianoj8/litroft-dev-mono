import { log } from 'util';
import { EnsinoNivel } from './../../shared/model/ensinoNivel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Subscription, Subject, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
import { EnsinoNivelService } from 'src/app/ensino-nivel/modules/ensino-nivel.service';

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
  public nivelEnsino: number;



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
    private institutoService: InstitutoService,
    private ensinoNivelService: EnsinoNivelService,
    private monografiaService: MonografiaService,
    private notification: NotificationService,
    private dialogService: MatDialog) {
    this.monografiaService.emitShowAddButton.emit(true);
    this.institutoService.onChangeContext.emit(false);
    this.institutoService.emitShowSearchBar.emit(true);
  }

  ngOnInit() {
    this.institutoService.emitShowSearchBar.emit(true);
    this.institutoService.onChangeContextTitle.emit('Escolas do Ensino Primario');
    if (this.router.routerState.snapshot.url.includes('/institutos/private/list')) {
      this.nivelEnsino = 0;
      this.filtro.nivel = 'Ensino Primario';
      this.displaydColumns = [
        'sigla',
        'numero',
        'nome',
        'localizacao',
        'detalhe',
        'edit',
        'delete'
      ];

      this.onRefrash(this.filtro);

      this.sub = this.institutoService.findValueParams
        .subscribe(next => this.onRefrash(next));

      this.sub = this.institutoService.emitOnDetalheButtonCliked.subscribe(
        (next) => this.detalhe(next)
      );

      this.sub = this.institutoService.emitOnEditButtonCliked.subscribe(
        (next) => this.edit(next)
      );

      this.sub = this.institutoService.emitOnDeleteButtonCliked.subscribe(
        (next) => this.openDeleteDialog(next)
      );

      this.sub = this.institutoService.findValueParams.subscribe(
        (value: CustomFilter) => this.onRefrash(value)
      );

    }

    if (this.router.routerState.snapshot.url.includes('/institutos/private/ciclo1/list')) {
      this.institutoService.onChangeContextTitle.emit('Escolas do I Ciclo');
      this.nivelEnsino = 1;
      this.filtro.nivel = 'Ensino do I Ciclo';
      this.displaydColumns = [
        'sigla',
        'numero',
        'nome',
        'localizacao',
        'detalhe',
        'edit',
        'delete'
      ];

      this.onRefrash(this.filtro);

      this.sub = this.institutoService.findValueParams
        .subscribe(next => this.onRefrash(next));

      this.sub = this.institutoService.emitOnDetalheButtonCliked.subscribe(
        (next) => this.detalhe(next)
      );

      this.sub = this.institutoService.emitOnEditButtonCliked.subscribe(
        (next) => this.edit(next)
      );

      this.sub = this.institutoService.emitOnDeleteButtonCliked.subscribe(
        (next) => this.openDeleteDialog(next)
      );

      this.sub = this.institutoService.findValueParams.subscribe(
        (value: CustomFilter) => this.onRefrash(value)
      );
    }

    if (this.router.routerState.snapshot.url.includes('/institutos/private/ciclo2/list')) {
      this.institutoService.onChangeContextTitle.emit('Escolas do II Ciclo');
      this.nivelEnsino = 2;
      this.filtro.nivel = 'Ensino do II Ciclo';
      this.displaydColumns = [
        'sigla',
        'nome',
        'formacao',
        'cursos',
        'localizacao',
        'detalhe',
        'edit',
        'delete'
      ];

      this.onRefrash(this.filtro);

      this.sub = this.institutoService.findValueParams
        .subscribe(next => this.onRefrash(next));

      this.sub = this.institutoService.emitOnDetalheButtonCliked.subscribe(
        (next) => this.detalhe(next)
      );

      this.sub = this.institutoService.emitOnEditButtonCliked.subscribe(
        (next) => this.edit(next)
      );

      this.sub = this.institutoService.emitOnDeleteButtonCliked.subscribe(
        (next) => this.openDeleteDialog(next)
      );

      this.sub = this.institutoService.findValueParams.subscribe(
        (value: CustomFilter) => this.onRefrash(value)
      );
    }
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.institutoService.listFiltered(data)
      .pipe(
        catchError(err => {
          this.dialogService.open(ErrorLoadingComponent);
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
    if (this.nivelEnsino === 0) {
      this.router.navigate(['institutos/add/primario']);
    }

    if (this.nivelEnsino === 1) {
      this.router.navigate(['institutos/add/ciclo1']);
    }

    if (this.nivelEnsino === 2) {
      this.router.navigate(['institutos/add/ciclo2']);
    }
  }

  detalhe(instituto: Instituto) {
    this.router.navigate(['institutos/detalhe', instituto.id]);
  }

  edit(instituto: Instituto) {

    if (this.nivelEnsino === 0) {
      this.router.navigate(['institutos/edit/primario', instituto.id]);
    }

    if (this.nivelEnsino === 1) {
      this.router.navigate(['institutos/edit/ciclo1', instituto.id]);
    }

    if (this.nivelEnsino === 2) {
      this.router.navigate(['institutos/edit/ciclo2', instituto.id]);
    }
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
    this.institutoService.deleteById(cursoId)
      .subscribe(
        () => {
          this.onRefrash(this.filtro);
          this.showDeletedMessage();
        },
        err => this.showErrorMessage()
      );
  }
}
