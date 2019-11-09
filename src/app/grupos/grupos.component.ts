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
  filtro: CustomFilter = new CustomFilter();
  private sub: Subscription;

  constructor(
    public grupoService: GrupoService,
    public estudanteService: EstudanteService,
    private cursoSerice: CursoService,
    private location: Location) {
    this.grupoService.onChangeContextTitle.emit('Grupo');
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


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }
    this.estudanteService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    this.estudanteService.findValueParamFromServer.emit(this.filtro);
  }

  filterByCurso(sexo: string) {
    this.filtro.sexo = sexo;
    this.estudanteService.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.curso = '';
    this.filtro.sexo = '';
    this.estudanteService.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(curso) {
    this.filtro.curso = curso;
  }


  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilterSearch() {}
}
