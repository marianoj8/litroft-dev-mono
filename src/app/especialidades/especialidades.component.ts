import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { CustomFilter } from '../shared/model/support/custom-filter';
import { EspecialidadeService } from './modules/especialidade.service';

@Component({
  selector: 'app-especialidade',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {

  state = false;
  public onChangeContext = false;
  private subscription: Subscription;
  filtro: CustomFilter = new CustomFilter();

  constructor(
    private especialidadeService: EspecialidadeService,
    private location: Location) {
  }

  ngOnInit() {
    this.subscription = this.especialidadeService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );
    this.especialidadeService.onChangeContextTitle.emit('Especialidade');
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  back() {
    this.location.back();
  }
}
