import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { TurmaService } from './modules/turma.service';
import { CustomFilter } from '../shared/model/support/custom-filter';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private turmaSerice: TurmaService,
    private location: Location) {
    this.turmaSerice.onChangeContextTitle.emit('Turma');
  }

  ngOnInit() {
    this.sub = this.turmaSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.turmaSerice.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.sigla = value.trim();
    this.turmaSerice.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.sigla = '';
    this.turmaSerice.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(sigla) {
    this.filtro.sigla = sigla;
  }


  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onFilterSearch() {}
}
