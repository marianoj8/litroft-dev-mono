import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { of, Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, share } from 'rxjs/operators';
import { Curso } from 'src/app/shared/model/curso';
import { Departamento } from 'src/app/shared/model/departamento';
import { Instituto } from 'src/app/shared/model/instituto';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';

import { InstitutoService } from './../modules/instituto.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instituto-list',
  templateUrl: './instituto-list.component.html',
  styleUrls: ['./instituto-list.component.css']
})
export class InstitutoListComponent implements OnInit {
  selectedInst = '***Instituição***';
  selectedInstLogo = '';
  institutos: MatTableDataSource<Instituto>;
  institutosList: Instituto[] = [];
  cursosList: Curso[] = [];
  filter = new CustomFilter();
  error$ = new Subject<boolean>();
  private sub: Subscription;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'sigla',
    'nome',
    'formacao',
    'cursos',
    'localizacao',
    'detalhe',
    'info'
  ];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private institutoService: InstitutoService,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.institutoService.onChangeContext.emit(false);
    this.filter.nome = '';
    this.onRefrash(this.filter);

    this.sub = this.institutoService.findValueParams
      .subscribe((value: CustomFilter) => this.onRefrash(value));
  }

  onRefrash(data?: CustomFilter) {
    this.sub = this.institutoService.list()
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

  openDeleteDialog(id: number) {

  }
  onSelectedInstituto(item: Instituto) {
    this.selectedInst = item.nome;
    this.selectedInstLogo = `${environment.API}/mono/downloadLogo/${item.logoId}`;

    this.institutoService.listCursoByInstituto(item.id).subscribe(
      (resp) => {
        this.cursosList = resp;
      }
    );
  }
}
