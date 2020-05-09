import { Component, OnInit } from '@angular/core';
import { MonografiaService } from './modules/monografia.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/internal/Subject';
import { Curso } from '../shared/model/curso';
import { Observable } from 'rxjs/internal/Observable';
import { CustomFilter } from '../shared/model/support/custom-filter';

@Component({
  selector: 'app-monografias',
  templateUrl: './monografias.component.html',
  styleUrls: ['./monografias.component.css']
})
export class MonografiasComponent implements OnInit {
  public cursosError$ = new Subject<boolean>();
  public onChangeContext = false;
  cursos$: Observable<Curso[]>;
  view = 0;
  filter = new CustomFilter();

  constructor(private monografiaService: MonografiaService, private location: Location) {
    this.monografiaService.onChangeContextTitle.emit('Monografias Internas');

  }

  ngOnInit() {
    this.monografiaService.emitShowAddButton.subscribe(
      context => this.onChangeContext = context
    );

  }

  cleanSearchField() {
    this.onFilterSearch('');
  }

  onFilterSearch(descricao?: string) {
    descricao = descricao === undefined ? '' : descricao;
    this.filter.descricao = descricao;
    this.monografiaService.findValueParams.emit(this.filter);
  }


  back() {
    this.location.back();
  }

  onBtnClickedToChange() {
    this.view++;
    if (this.view > 2) {
      this.view = 0;
    }
  }

}
