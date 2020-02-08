import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent, MAT_DIALOG_DATA } from '@angular/material';
import { of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EstudanteService } from 'src/app/estudantes/modules/estudante.service';
import { Estudante } from 'src/app/shared/model/estudante';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatDailogTypeParam } from 'src/app/shared/model/support/mat-dialog-type-param';

import { GrupoService } from '../modules/grupo.service';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.css']
})
export class SelectElementComponent implements OnInit {

  pageEvent: PageEvent;
  dialogParam: MatDailogTypeParam = new MatDailogTypeParam();
  valueParam = '';
  filtro: CustomFilter = new CustomFilter();
  estudantes: MatTableDataSource<Estudante>;
  estudantesList: Estudante[] = [];
  selectedElementes: Estudante[] = [];
  error$ = new Subject<boolean>();
  private sub: Subscription;
  selection = new SelectionModel<Estudante>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displaydColumns: string[] = [
    'select',
    'numeroProcesso',
    'nome',
    'sexo',
    'endereco',
  ];

  constructor(
    public service: EstudanteService,
    public grupoService: GrupoService,
    @Inject(MAT_DIALOG_DATA) public dialogData: CustomFilter) {

  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.estudantes.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.estudantes.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Estudante): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  ngOnInit() {
    this.sub = this.service.findValueParams
      .subscribe(data => this.onRefrash(data));

    this.sub = this.service.findValueParam
      .subscribe(data => this.estudantes.filter = data);

    this.filtro.isGroup = false;
    this.filtro.curso = this.dialogData.curso;
    this.filtro.turma = this.dialogData.turma;
    this.onRefrash(this.filtro);
  }

  onFilterFromServer(data: CustomFilter) {
    this.sub = this.service.filterByNomeSexoCurso(data).subscribe(
      next => this.estudantesList = next);
  }

  onRefrash(data?: CustomFilter) {
    console.log(data);
    this.sub = this.service.filterByNotGrupo(data)
      .pipe(
        catchError(err => {
          // this.dialogService.open(ErrorLoadingComponent);
          this.error$.next(true);
          return of(null);
        })
      )
      .subscribe(
        next => {
          const array = next.map((item: Estudante) => {
            return {
              ...item
            };

          });
          this.estudantes = new MatTableDataSource(array);
          this.estudantes.sort = this.sort;
          this.estudantesList = this.estudantes.data;
        });
  }

  listAll() {
    this.grupoService.emitSelectedElements.emit(this.selection.selected);
  }
}
