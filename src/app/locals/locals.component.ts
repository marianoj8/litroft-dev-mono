import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';

import { Local } from '../shared/model/local';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { LocalService } from './modules/local.service';



@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  state = false;
  public onChangeContext = false;
  cursos$: Observable<Local[]>;
  cursosError$ = new Subject<boolean>();
  filter: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(private localService: LocalService) { }

  ngOnInit() {
  }

  onFilterSearch(nome?: string): void {
    this.filter.nome = nome === undefined ? '' : nome;
    this.localService.findValueParams.emit(this.filter);
  }

  cleanSearchField() {
    this.onFilterSearch('');
  }

}
