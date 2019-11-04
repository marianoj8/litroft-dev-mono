import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

import { MonografiaService } from '../monografias/modules/monografia.service';
import { Projeto } from '../shared/model/projeto';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { ProjetoService } from './modules/projeto.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  projetos$: Observable<Projeto[]>;
  projetosError$ = new Subject<boolean>();
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  anos: number[] = [1, 2, 3, 4, 5, 6];

  constructor(
    private projetoSerice: ProjetoService,
    private location: Location,
    private monografiaService: MonografiaService) {
    this.monografiaService.emitShowAddButton.emit(true);

    this.projetoSerice.onChangeContextTitle.emit('Projeto');
  }

  ngOnInit() {
    this.sub = this.projetoSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.projetos$ = this.projetoSerice.list()
      .pipe(catchError(err => {
        this.projetosError$.next(true);
        return of([]);
      }));

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.projetoSerice.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.projetoSerice.findValueParamFromServer.emit(this.filtro);
  }

  filterByDuracao(duracao: number) {
    this.filtro.duracao = duracao;
    this.projetoSerice.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.filtro.duracao = 1;
    this.projetoSerice.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(nome) {
    this.filtro.nome = nome;
  }


  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onFilterSearch() { }
}
