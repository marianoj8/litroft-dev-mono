import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, Subject, of } from 'rxjs';
import { Curso } from '../shared/model/curso';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { InscricaoService } from '../inscricao/modules/inscricao.service';
import { CursoService } from '../cursos/modules/curso.service';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { EstudanteFilterComponent } from '../estudantes/estudante-filter/estudante-filter.component';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit, OnDestroy {

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
    this.inscricaoService.onChangeContextTitle.emit('Matriculas');
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

  emitSubscriptionOption() {
    this.inscricaoService.emitSubOption.emit(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  back() {
    this.location.back();
  }

}