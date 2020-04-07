import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomFilter } from '../shared/model/support/custom-filter';
import { Subject, Observable, Subscription, of } from 'rxjs';
import { ProfessorService } from './modules/professor.service';
import { catchError } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit, OnDestroy {
  state = false;
  public onChangeContext = false;
  filtro: CustomFilter = new CustomFilter();
  especialidadeError$: Subject<boolean>;
  private sub: Subscription;

  constructor(
    public professorService: ProfessorService,
    private location: Location) {
    this.professorService.onChangeContextTitle.emit('Professores');

  }

  ngOnInit() {
    this.sub = this.professorService.onChangeContext.subscribe(
      context => this.onChangeContext = context);

    // this.especialidades$ = this.especialidadeService.list()
    //   .pipe(
    //     catchError(err => {
    //       this.especialidadeError$.next(true);
    //       return of([]);
    //     })
    //   );

  }


  find(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.findFromServer(value);
    }

    this.professorService.findValueParam.emit(value.trim());
  }

  findFromServer(value: string) {
    this.filtro.nome = value.trim();
    // this.filtro.descricao = ''
    // this.filtro.sexo = ''
    this.professorService.findValueParamFromServer.emit(this.filtro);
  }

  filterByEspecialidade(sexo: string) {
    this.filtro.sexo = sexo;
    this.professorService.findValueParams.emit(this.filtro);
  }

  showAll() {
    this.filtro.descricao = '';
    this.filtro.sexo = '';
    this.professorService.findValueParams.emit(this.filtro);
  }

  cleanSearchField() {
    this.findFromServer('');
  }

  logName(descricao) {
    this.filtro.descricao = descricao;
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onFilterSearch() { }
}
