import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { Subscription } from 'rxjs';
import { ProvinciaService } from './modules/provincia.service';
import { MonografiaService } from '../monografias/modules/monografia.service';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {
  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private departamentoSerice: ProvinciaService,
    private monografiaService: MonografiaService,
    private location: Location) {
    this.departamentoSerice.onChangeContextTitle.emit('Provincias');
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.sub = this.departamentoSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );
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

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilterSearch() { }
}
