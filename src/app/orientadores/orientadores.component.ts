import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';

import { CustomFilter } from '../shared/model/support/custom-filter';
import { Especialidade } from '../shared/model/especialidade';
import { OrientadorService } from './modules/OrientadorService.service';
import { EspecialidadeService } from '../especialidades/modules/especialidade.service';

@Component({
  selector: 'app-orientadores',
  templateUrl: './orientadores.component.html',
  styleUrls: ['./orientadores.component.css']
})
export class OrientadoresComponent implements OnInit, OnDestroy {
  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  especialidadeError$: Subject<boolean>;
  especialidades$: Observable<Especialidade[]>;
  private sub: Subscription;

  constructor(
    public orientadorService: OrientadorService,
    private especialidadeService: EspecialidadeService,
    private location: Location) {
      this.orientadorService.onChangeContextTitle.emit('Orientador');

  }

  ngOnInit() {
    this.sub = this.orientadorService.onChangeContext.subscribe(
      context => this.onChangeContext = context);

    this.especialidades$ = this.especialidadeService.list()
      .pipe(
        catchError(err => {
          this.especialidadeError$.next(true);
          return of([]);
        })
      );

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.orientadorService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    // this.filtro.descricao = ''
    // this.filtro.sexo = ''
    this.orientadorService.findValueParamFromServer.emit(this.filtro);
  }

  filterByEspecialidade(sexo: string) {
    this.filtro.sexo = sexo;
    this.orientadorService.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.descricao = '';
    this.filtro.sexo = '';
    this.orientadorService.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(descricao) {
    this.filtro.descricao = descricao;
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilterSearch(){}
}
