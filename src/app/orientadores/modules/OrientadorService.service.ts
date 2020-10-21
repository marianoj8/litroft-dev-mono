import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Orientador } from 'src/app/shared/model/orientador';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class OrientadorService {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  OrientadorTable: MatTableDataSource<Orientador[]>;
  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Orientador> {
    return this.http.get<Orientador>(`${this.url}/interno/orientador/${id}`);
  }

  list(): Observable<Orientador[]> {
    return this.http.get<Orientador[]>(`${this.url}/interno/orientador/l`);
  }

  filterByNomeSexoEspecialidade(q: CustomFilter): Observable<Orientador[]> {
    q = this.filterResolve(q);
    return this.http
      .get<Orientador[]>(`${this.url}/interno/orientador/l?nome=${q.nome}&sexo=${q.sexo}&especialidade=${q.descricao}`);
  }

  filterBySexoAndEspecialidade(q: CustomFilter): Observable<Orientador[]> {
    q = this.filterResolve(q);
    return this.http
      .get<Orientador[]>(`${this.url}/interno/orientador/l?sexo=${q.sexo}&especialidade=${q.descricao}`);
  }

  save(t: Orientador): Observable<Orientador> {

    if (t.id) {
      return this.http.put<Orientador>(`${this.url}/interno/orientador`, t);
    }
    return this.http.post<Orientador>(`${this.url}/interno/orientador`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/orientador/${id}`);
  }

  filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.sexo = filterParam.sexo === undefined ? '' : filterParam.sexo;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    return filterParam;
  }

}


