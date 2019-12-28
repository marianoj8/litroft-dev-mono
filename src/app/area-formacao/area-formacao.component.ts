import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CustomFilter } from '../shared/model/support/custom-filter';
import { AreaFormacaoService } from './modules/area-formacao.service';

@Component({
  selector: 'app-area-formacao',
  templateUrl: './area-formacao.component.html',
  styleUrls: ['./area-formacao.component.css']
})
export class AreaFormacaoComponent implements OnInit, OnDestroy {
  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private areaFormacaoSerice: AreaFormacaoService,
    private location: Location) {
    this.areaFormacaoSerice.onChangeContextTitle.emit('Area de Formação');
  }

  ngOnInit() {
    this.sub = this.areaFormacaoSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.areaFormacaoSerice.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.areaFormacaoSerice.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.areaFormacaoSerice.findValueParams.emit(this.filtro);
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
