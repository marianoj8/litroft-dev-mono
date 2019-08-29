import { Component, OnInit } from '@angular/core';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { Subscription } from 'rxjs';
import { TurmaService } from './modules/turma.service';

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
    private turmaSerice: TurmaService, ) {
  }

  ngOnInit() {
    this.subscription = this.turmaSerice.onChangeContext.subscribe(
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
