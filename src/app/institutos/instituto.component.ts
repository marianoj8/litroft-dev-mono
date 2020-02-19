import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstitutoService } from './modules/instituto.service';
import { Subscription } from 'rxjs';
import { CursoService } from 'src/app/cursos/modules/curso.service';
import { MonografiaService } from 'src/app/monografias/modules/monografia.service';
import { CustomFilter } from '../shared/model/support/custom-filter';

@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrls: ['./instituto.component.css']
})
export class InstitutoComponent implements OnInit, OnDestroy {

  public onChangeContext = false;
  public emitShowSearchBar = false;
  filter = new CustomFilter();
  private sub: Subscription;

  constructor(
    private institutoService: InstitutoService,
    private cursoService: CursoService,
    private monografiaService: MonografiaService,
    private location: Location) {
    this.institutoService.onChangeContextTitle.emit('Escolas do ensono primario ao II ciclo');
    this.monografiaService.emitShowAddButton.emit(true);
  }

  ngOnInit() {
    this.sub = this.institutoService.onChangeContext.subscribe(
      context => this.onChangeContext = context
    );

    this.sub = this.institutoService.emitShowSearchBar.subscribe(
      context => this.emitShowSearchBar = context
    );

  }

  cleanSearchField() {
    this.onFilterSearch('');
  }

  onFilterSearch(nome?: string) {
    this.filter.nome = nome === undefined ? '' : nome;
    this.filter.sigla = '';
    this.institutoService.findValueParams.emit(this.filter);
  }

  find($event, param: string) { }

  back() {
    this.location.back();
    this.institutoService.emitShowSearchBar.emit(false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
