import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Curso } from '../shared/model/curso';
import { CursoService } from '../cursos/modules/curso.service';
import { EstudanteService } from './modules/estudante.service';

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
    public estudanteService: EstudanteService,
    private cursoSerice: CursoService,
    private location: Location) {

  }

  ngOnInit() {
    this.subscription = this.estudanteService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.cursos$ = this.cursoSerice.list()
      .pipe(catchError(err => {
        this.cursosError$.next(true);
        return of([]);
      }));

    this.estudanteService.onChangeContextTitle.emit('Estudante');
  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.estudanteService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.estudanteService.findValueParamFromServer.emit(this.filtro);
  }

  filterByCurso(sexo: string) {
    this.filtro.sexo = sexo;
    this.estudanteService.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.curso = '';
    this.filtro.sexo = '';
    this.estudanteService.findValueParams.emit(this.filtro);
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

  back() {
    this.location.back();
  }

}
