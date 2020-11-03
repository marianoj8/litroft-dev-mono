import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { CoordenadorService } from './modules/coordenador.service';

@Component({
  selector: 'app-coordendor',
  templateUrl: './coordenador.component.html',
  styleUrls: ['./coordenador.component.css']
})
export class CoordenadorComponent implements OnInit, OnDestroy {

  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private coordenadorService: CoordenadorService,
    private location: Location) {
    this.coordenadorService.onChangeContextTitle.emit('Coordenador');
  }

  ngOnInit() {
    this.sub = this.coordenadorService.onChangeContext.subscribe(
      context => this.onChangeContext = context);


  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.coordenadorService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.coordenadorService.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.coordenadorService.findValueParams.emit(this.filtro);
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
