import { Component, OnInit, EventEmitter } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

import { Curso } from '../shared/model/curso';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { CursoService } from './modules/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  cursos$: Observable<Curso[]>;
  cursosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();


  anos: number[] = [1, 2, 3, 4, 5, 6];

  constructor(
    private cursoSerice: CursoService,
    private location: Location) {
  }

  ngOnInit() {
    this.subscription = this.cursoSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.cursos$ = this.cursoSerice.list()
      .pipe(catchError(err => {
        this.cursosError$.next(true);
        return of([]);
      }));

    this.cursoSerice.onChangeContextTitle.emit('Curso');
  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.cursoSerice.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.cursoSerice.findValueParamFromServer.emit(this.filtro);
  }

  filterByDuracao(duracao: number) {
    this.filtro.duracao = duracao;
    this.cursoSerice.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.filtro.duracao = 1;
    this.cursoSerice.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(nome) {
    this.filtro.nome = nome;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  back() {
    this.location.back();
  }

}
