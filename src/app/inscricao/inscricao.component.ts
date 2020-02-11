import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { Subscription, Observable, Subject, of } from 'rxjs';
import { Location } from '@angular/common';

import { Curso } from '../shared/model/curso';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { EstudanteService } from '../estudantes/modules/estudante.service';
import { CursoService } from '../cursos/modules/curso.service';
import { EstudanteFilterComponent } from '../estudantes/estudante-filter/estudante-filter.component';
import { InscricaoService } from './modules/inscricao.service';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  cursos$: Observable<Curso[]>;
  cursosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();

  constructor(
    public inscricaoService: InscricaoService,
    private cursoSerice: CursoService,
    private location: Location,
    private dialogService: MatDialog) {
    this.inscricaoService.onChangeContextTitle.emit('Inscrições');
  }

  ngOnInit() {
    this.subscription = this.inscricaoService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.cursos$ = this.cursoSerice.list()
      .pipe(catchError(err => {
        this.cursosError$.next(true);
        return of([]);
      }));


  }

  openLargeFilterView() {
    const dialogRef = this.dialogService.open(
      EstudanteFilterComponent,
      {
        height: '550px',
        width: '600px'
      });
  }
  openSamllFilterView() {
    const dialogRef = this.dialogService.open(
      EstudanteFilterComponent,
      {
        height: '500px',
        width: '380px'
      });
  }

  emitFormStudant() {
    this.inscricaoService.emitFormScreen.emit(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  back() {
    this.location.back();
  }

}
