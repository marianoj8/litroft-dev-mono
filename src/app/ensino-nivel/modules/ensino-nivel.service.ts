import { EnsinoNivel } from './../../shared/model/ensinoNivel';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EnsinoNivelService {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  url = environment.API;

  constructor(
    private http: HttpClient
  ) { }

  getById(id: number): Observable<EnsinoNivel> {
    return this.http.get<EnsinoNivel>(`${this.url}/ensinonivel/${id}`);
  }

  list(): Observable<EnsinoNivel[]> {
    return this.http.get<EnsinoNivel[]>(`${this.url}/ensinonivel`);
  }

  listCursoByEnsinoNivel(id: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/curso/l/ensinonivel/${id}`);
  }

  listFiltered(filterParam: CustomFilter): Observable<EnsinoNivel[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<EnsinoNivel[]>(`${this.url}/ensinonivel?nome=${filterParam.nome}&sigla=${filterParam.sigla}`);
  }

  listFilteredWithNivel(filterParam: CustomFilter): Observable<EnsinoNivel[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<EnsinoNivel[]>(`${this.url}/ensinonivel/nivel?nome=${filterParam.nome}&sigla=${filterParam.sigla}&nivel=${filterParam.nivel}`);
  }

  save(t: EnsinoNivel): Observable<EnsinoNivel> {
    if (t.id) {
      return this.http.put<EnsinoNivel>(`${this.url}/admin/ensinonivel`, t);
    }
    return this.http.post<EnsinoNivel>(`${this.url}/admin/ensinonivel`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/ensinonivel/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.sigla = filterParam.sigla === undefined ? '' : filterParam.sigla;
    filterParam.nivel = filterParam.nivel === undefined ? '' : filterParam.nivel;
    filterParam.nivelId = filterParam.nivelId === undefined ? 0 : filterParam.nivelId;
    return filterParam;
  }

}
