import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CustomFilter } from '../shared/model/support/custom-filter';
import { DiciplinaService } from './modules/diciplina.service';

@Component({
  selector: 'app-diciplinas',
  templateUrl: './diciplinas.component.html',
  styleUrls: ['./diciplinas.component.css']
})
export class DiciplinasComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private diciplinaService: DiciplinaService,
    private location: Location) {
    this.diciplinaService.onChangeContextTitle.emit('Diciplinas');
  }

  ngOnInit() {
    this.sub = this.diciplinaService.onChangeContext.subscribe(
      context => this.onChangeContext = context);


  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.diciplinaService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.diciplinaService.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.diciplinaService.findValueParams.emit(this.filtro);
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

}
