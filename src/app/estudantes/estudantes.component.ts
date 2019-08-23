import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Subscription, empty, Observable, of, Subject } from 'rxjs';

import { EstudanteService } from './modules/estudante.service';
import { CursoService } from '../cursos/modules/curso.service';
import { catchError } from 'rxjs/operators';
import { Curso } from '../shared/model/curso';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  cursos$: Observable<Curso[]>;
  cursosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();

  constructor(
    public service: EstudanteService,
    private cursoSerice: CursoService, ) {

  }

  ngOnInit() {
    this.subscription = this.service.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.cursos$ = this.cursoSerice.list()
      .pipe(catchError(err => {
        this.cursosError$.next(true);
        return of([]);
      }));

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.service.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.service.findValueParamFromServer.emit(this.filtro);
  }

  filterByCurso(sexo: string) {
    this.filtro.sexo = sexo;
    this.service.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.curso = '';
    this.filtro.sexo = '';
    this.service.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(curso) {
    this.filtro.curso = curso;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
