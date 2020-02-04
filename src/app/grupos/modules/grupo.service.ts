import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Estudante } from 'src/app/shared/model/estudante';
import { Grupo } from 'src/app/shared/model/grupo';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();
  emitSelectedElements = new EventEmitter<Estudante[]>();

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.url}/interno/grupo/${id}`);
  }

  list(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}/interno/grupo/l`);
  }

  listByDescricao(descricao: string): Observable<Grupo[]> {
    descricao = descricao === undefined ? '' : descricao;
    return this.http.get<Grupo[]>(`${this.url}/interno/grupo/l?descricao=${descricao}`);
  }

  listPublic(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}/grupo/l/public`);
  }

  filterByDescricaoAndTow(filter: CustomFilter): Observable<Grupo[]> {
    filter = this.filterResolve(filter);
    return this.http.get<Grupo[]>(`${this.url}/interno/grupo/l?descricao=${filter.descricao}&curso=${filter.curso}&turma=${filter.turma}`);
  }

  filterByDuracao(duracao: number): Observable<Grupo[]> {
    return this.http
      .get<Grupo[]>(`${this.url}/interno/grupo/l?duracao=${!!duracao ? duracao : 1}`);
  }

  save(t: Grupo): Observable<Grupo> {
    if (t.id) {
      return this.http.put<Grupo>(`${this.url}/interno/grupo`, t);
    }
    return this.http.post<Grupo>(`${this.url}/interno/grupo`, t);
  }

  updateView(t: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.url}/grupo`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/grupo/${id}`);
  }

  private filterResolve(filter: CustomFilter): CustomFilter {
    filter.descricao = filter.descricao === undefined ? '' : filter.descricao;
    filter.curso = filter.curso === undefined ? '' : filter.curso;
    filter.turma = filter.turma === undefined ? '' : filter.turma;
    return filter;
  }
}
