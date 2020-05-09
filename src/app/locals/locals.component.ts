import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';

import { Local } from '../shared/model/local';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { LocalService } from './modules/local.service';
import { MonografiaService } from '../monografias/modules/monografia.service';
import { PublicService } from '../public/modules/public.service';


@Component({
  selector: 'app-locals',
  templateUrl: './locals.component.html',
  styleUrls: ['./locals.component.css']
})
export class LocalsComponent implements OnInit {

  state = false;
  public onChangeContext = false;
  filter: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private localService: LocalService,
    private monografiaService: MonografiaService,
    private publicService: PublicService,
    private location: Location) {
    this.localService.onChangeContextTitle.emit('Local');
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.sub = this.localService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.publicService.enableReadMode.emit(false);
  }

  onFilterSearch(nome?: string): void {
    this.filter.nome = nome === undefined ? '' : nome;
    this.localService.findValueParams.emit(this.filter);
  }

  cleanSearchField() {
    this.onFilterSearch('');
  }


  back() {
    this.location.back();
  }

}
