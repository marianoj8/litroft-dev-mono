import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
    private cursoSerice: EspecialidadeService, ) {
  }

  ngOnInit() {
    this.subscription = this.cursoSerice.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.cursoSerice.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.cursoSerice.findValueParamFromServer.emit(this.filtro);
  }

  showAll() {
    this.filtro.nome = '';
    this.cursoSerice.findValueParams.emit(this.filtro);
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

}
