import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material';
import { Professor } from 'src/app/shared/model/professor';

@Injectable({ providedIn: 'root' })
export class ProfessorService {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  ProfessorTable: MatTableDataSource<Professor[]>;
  constructor(private http: HttpClient) { }

  getById(id: number, institutoId: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.url}/interno/professor/${id}?institutoId=${institutoId}`);
  }

  list(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.url}/interno/professor/l`);
  }

  filterByNomeSexoEspecialidade(q: CustomFilter): Observable<Professor[]> {
    q = this.filterResolve(q);
    return this.http
      .get<Professor[]>(`${this.url}/interno/professor/l?nome=${q.nome}&sexo=${q.sexo}`);
  }

  filterBySexoAndEspecialidade(q: CustomFilter): Observable<Professor[]> {
    q = this.filterResolve(q);
    return this.http
      .get<Professor[]>(`${this.url}/interno/professor/l?sexo=${q.sexo}&especialidade=${q.descricao}`);
  }

  save(t: Professor): Observable<Professor> {

    if (t.id) {
      return this.http.put<Professor>(`${this.url}/interno/professor`, t);
    }
    return this.http.post<Professor>(`${this.url}/interno/professor`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/professor/${id}`);
  }

  filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.sexo = filterParam.sexo === undefined ? '' : filterParam.sexo;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    return filterParam;
  }

}