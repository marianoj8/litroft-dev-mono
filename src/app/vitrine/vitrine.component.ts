import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

import { Curso } from '../shared/model/curso';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { EstudanteService } from '../estudantes/modules/estudante.service';
import { CursoService } from '../cursos/modules/curso.service';
import { vitrineService } from './modules/vitrine.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent implements OnInit, OnDestroy {
  state = false;
  public onChangeContext = false;
  cursos$: Observable<Curso[]>;
  cursosError$ = new Subject<boolean>();
  filter = new CustomFilter();
  private sub: Subscription;

  constructor(
    public vitrineService: vitrineService,
    public estudanteService: EstudanteService,
    private cursoSerice: CursoService,
    private location: Location) {
    this.vitrineService.onChangeContextTitle.emit('vitrine');
  }

  ngOnInit() {
    this.sub = this.vitrineService.onChangeContext.subscribe(
      context => this.onChangeContext = context);

    this.cursos$ = this.cursoSerice.list()
      .pipe(catchError(err => {
        this.cursosError$.next(true);
        return of([]);
      }));

  }

  cleanSearchField() {
    this.onFilterSearch('');
  }

  onFilterSearch(descricao?: string) {
    this.filter.descricao = descricao === undefined ? '' : descricao;
    this.vitrineService.findValueParams.emit(this.filter);
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
