import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';

import { Estudante } from 'src/app/shared/model/estudante';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();
  emitOnConfirmButtonCliked = new EventEmitter<boolean>();

  estudanteTable: MatTableDataSource<Estudante[]>;
  constructor(private http: HttpClient) {
  }

  getById(id: number, entityId: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${this.url}/interno/estudante/${id}?institutoId=${entityId}`);
  }

  list(entityId: number): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(`${this.url}/interno/estudante/l?institutoId=${entityId}`);
  }

  filterByNomeSexoCurso(query: CustomFilter, entityId: number): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l?nome=${query.nome}&curso=${query.curso}&sexo=${query.sexo}&turma=${query.turma}&institutoId=${entityId}`);
  }

  filterByNomeSexoTurma(query: CustomFilter, entityId: number): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante?nome=${query.nome}&sexo=${query.sexo}&turma=${query.turma}&institutoId=${entityId}`);
  }

  countByCursoAndTurma(query: CustomFilter, entityId: number) {
    query = this.filterResolve(query);
    return this.http
      .get(`${this.url}/interno/estudante/count?cursoId=${query.cursoId}&classeId=${query.classeId}&turmaId=${query.turmaId}&anoLetivo=${query.anoLetivo}&institutoId=${entityId}`)
      .pipe(delay(1000));
  }

  filterByNomeSexoCursoPendente(query: CustomFilter, entityId: number): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/pendente?nome=${query.nome}&curso=${query.curso}&sexo=${query.sexo}&institutoId=${entityId}`);
  }

  filterByNomeSexoPendenteNivel(query: CustomFilter, entityId: number): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/pendente/nivelId?nome=${query.nome}&nivelId=${query.nivelId}&sexo=${query.sexo}&institutoId=${entityId}`);
  }

  filterBySexoAndCurso(curso: string, sexo: string, entityId: number): Observable<Estudante[]> {
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}&institutoId=${entityId}`);
  }

  filterByAllAtributsEntrada(query: CustomFilter, entityId: number): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l/entrada?curso=${query.curso}&turma=${query.turma}&sexo=${query.sexo}&entrada=${query.entrada}&institutoId=${entityId}`);
  }

  filterByAllAtributsFinalista(query: CustomFilter, entityId: number): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l/finalista?curso=${query.curso}&turma=${query.turma}&sexo=${query.sexo}&finalista=${query.finalista}&institutoId=${entityId}`);
  }

  filterByNotGrupo(query: CustomFilter, entityId: number): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l/notgrup?nome=${query.nome}&curso=${query.curso}&turma=${query.turma}&sexo=${query.sexo}&institutoId=${entityId}`);
  }

  filterBySexoAndCursoAndPosition(curso: string, sexo: string, p: string, entityId: number): Observable<Estudante[]> {
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}&posicao=${!!p ? p : ''}&institutoId=${entityId}`);
  }

  filterBySexoAndCursoAngGroup(q: CustomFilter, entityId: number): Observable<Estudante[]> {
    q = this.filterResolve(q);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l/g?curso=${q.curso}&sexo=${q.sexo}&isGroup=${q.isGroup}&institutoId=${entityId}`);
  }

  save(t: Estudante): Observable<Estudante> {

    if (t.id) {
      return this.http.put<Estudante>(`${this.url}/interno/estudante`, t);
    }
    return this.http.post<Estudante>(`${this.url}/interno/estudante`, t);
  }

  set(t: Estudante[]): Observable<Estudante[]> {
    return this.http.put<Estudante[]>(`${this.url}/interno/estudante/set`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/estudante/${id}`);
  }

  private filterResolve(query: CustomFilter): CustomFilter {
    query.nome = query.nome === undefined ? '' : query.nome;
    query.nivelId = query.nivelId === undefined ? 1 : query.nivelId;
    query.curso = query.curso === undefined ? '' : query.curso;
    query.turma = query.turma === undefined ? '' : query.turma;
    query.sexo = query.sexo === undefined ? '' : query.sexo;
    query.isGroup = query.isGroup === undefined ? false : query.isGroup;
    query.anoLetivo = query.anoLetivo === undefined ? new Date().getFullYear().toString() : query.anoLetivo;
    query.entrada = query.entrada === undefined ? new Date().getFullYear() : query.entrada;
    query.finalista = query.finalista === undefined ? new Date().getFullYear() : query.finalista;
    return query;
  }

}

