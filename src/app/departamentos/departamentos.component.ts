import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CustomFilter } from '../shared/model/support/custom-filter';
import { Location } from '@angular/common';
import { DepartamentoService } from './modules/departamento.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  filtro: CustomFilter = new CustomFilter();

  constructor(
    private departamentoSerice: DepartamentoService,
    private location: Location) {
  }

  ngOnInit() {
    this.subscription = this.departamentoSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );
    this.departamentoSerice.onChangeContextTitle.emit('Departamento');
  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.departamentoSerice.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.departamentoSerice.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.departamentoSerice.findValueParams.emit(this.filtro);
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
