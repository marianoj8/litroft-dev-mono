import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Estudante } from 'src/app/shared/model/estudante';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from '../../../environments/environment.prod';

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

  estudanteTable: MatTableDataSource<Estudante[]>;
  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${this.url}/interno/estudante/${id}`);
  }

  list(): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(`${this.url}/interno/estudante/l`);
  }

  filterByNomeSexoCurso(query: CustomFilter): Observable<Estudante[]> {
    query = this.filterResolve(query);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l?nome=${query.nome}&curso=${query.curso}&sexo=${query.sexo}`);
  }

  filterBySexoAndCurso(curso: string, sexo: string): Observable<Estudante[]> {
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}`);
  }

  filterBySexoAndCursoAndPosition(curso: string, sexo: string, p: string): Observable<Estudante[]> {
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}&posicao=${!!p ? p : ''}`);
  }

  filterBySexoAndCursoAngGroup(q: CustomFilter): Observable<Estudante[]> {
    q = this.filterResolve(q);
    return this.http
      .get<Estudante[]>(`${this.url}/interno/estudante/l/g?curso=${q.curso}&sexo=${q.sexo}&isGroup=${q.isGroup}`);
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
    query.curso = query.curso === undefined ? '' : query.curso;
    query.sexo = query.sexo === undefined ? '' : query.sexo;
    query.isGroup = query.isGroup === undefined ? false : query.isGroup;
    return query;
  }

}

