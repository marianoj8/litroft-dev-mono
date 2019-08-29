import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { TurmaService } from './modules/turma.service';
import { CustomFilter } from '../shared/model/support/custom-filter';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {

  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  filtro: CustomFilter = new CustomFilter();

  constructor(
    private turmaSerice: TurmaService,
    private location: Location) {
  }

  ngOnInit() {
    this.subscription = this.turmaSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.turmaSerice.onChangeContextTitle.emit('Turma');
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  back() {
    this.location.back();
  }

}
