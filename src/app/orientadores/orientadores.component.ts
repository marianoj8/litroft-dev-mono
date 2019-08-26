import { Component, OnInit } from '@angular/core';
import { Subscription, Subject, Observable, of } from 'rxjs';

import { CustomFilter } from '../shared/model/support/custom-filter';
import { OrientadorService } from './modules/OrientadorService.service';
import { EspecialidadeService } from './../especialidade/modules/especialidade.service';
import { Especialidade } from '../shared/model/especialidade';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-orientadores',
  templateUrl: './orientadores.component.html',
  styleUrls: ['./orientadores.component.css']
})
export class OrientadoresComponent implements OnInit {
  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  filtro: CustomFilter = new CustomFilter();
  especialidadeError$: Subject<boolean>;
  especialidades$: Observable<Especialidade[]>;

  constructor(
    public service: OrientadorService,
    private especialidadeService: EspecialidadeService) {

  }

  ngOnInit() {
    this.subscription = this.service.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );
    this.especialidades$ = this.especialidadeService.list()
      .pipe(catchError(err => {
        this.especialidadeError$.next(true);
        return of([]);
      }))
  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.service.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    // this.filtro.descricao = ''
    // this.filtro.sexo = ''
    this.service.findValueParamFromServer.emit(this.filtro);
  }

  filterByEspecialidade(sexo: string) {
    this.filtro.sexo = sexo;
    this.service.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.descricao = '';
    this.filtro.sexo = '';
    this.service.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(descricao) {
    this.filtro.descricao = descricao;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
