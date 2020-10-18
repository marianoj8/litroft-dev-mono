import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { CoordenacaoService } from './modules/coordenacao.service';

@Component({
  selector: 'app-coordenacao',
  templateUrl: './coordenacao.component.html',
  styleUrls: ['./coordenacao.component.css']
})
export class CoordenacaoComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private especialidadeService: CoordenacaoService,
    private location: Location) {
    this.especialidadeService.onChangeContextTitle.emit('Coordenacaos');
  }

  ngOnInit() {
    this.sub = this.especialidadeService.onChangeContext.subscribe(
      context => this.onChangeContext = context);


  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.especialidadeService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.especialidadeService.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.especialidadeService.findValueParams.emit(this.filtro);
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
