import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, of } from 'rxjs';

import { InstitutoService } from '../institutos/modules/instituto.service';
import { Instituto } from '../shared/model/instituto';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { AdminInternoService } from './modules/adminInterno.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interno',
  templateUrl: './admin-interno.component.html',
  styleUrls: ['./admin-interno.component.css']
})
export class AdminInternoComponent implements OnInit, OnDestroy {
  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  especialidadeError$: Subject<boolean>;
  especialidades$: Observable<Instituto[]>;
  private sub: Subscription;

  constructor(
    public orientadorService: AdminInternoService,
    private especialidadeService: InstitutoService,
    private location: Location) {
    this.orientadorService.onChangeContextTitle.emit('Directores');

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

  filterByInstituto(sexo: string) {
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

  onFilterSearch() { }
}
