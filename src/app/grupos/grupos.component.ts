import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

import { Curso } from '../shared/model/curso';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { GrupoService } from './modules/grupo.service';
import { EstudanteService } from '../estudantes/modules/estudante.service';
import { CursoService } from '../cursos/modules/curso.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit, OnDestroy {
  state = false;
  public onChangeContext = false;
  cursos$: Observable<Curso[]>;
  cursosError$ = new Subject<boolean>();
  filter = new CustomFilter();
  private sub: Subscription;

  constructor(
    public grupoService: GrupoService,
    public estudanteService: EstudanteService,
    private cursoSerice: CursoService,
    private location: Location) {
    this.grupoService.onChangeContextTitle.emit('Grupos');
  }

  ngOnInit() {
    this.sub = this.grupoService.onChangeContext.subscribe(
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

  onFilterSearch(descricao: string) {
    this.filter.descricao = descricao === undefined ? '' : descricao;
    this.grupoService.findValueParams.emit(this.filter);
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
