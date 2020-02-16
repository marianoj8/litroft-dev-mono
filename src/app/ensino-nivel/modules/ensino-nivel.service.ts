import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instituto } from 'src/app/shared/model/instituto';
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

  getById(id: number): Observable<Instituto> {
    return this.http.get<Instituto>(`${this.url}/instituto/${id}`);
  }

  list(): Observable<Instituto[]> {
    return this.http.get<Instituto[]>(`${this.url}/instituto`);
  }

  listCursoByInstituto(id: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/curso/l/instituto/${id}`);
  }

  listFiltered(filterParam: CustomFilter): Observable<Instituto[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<Instituto[]>(`${this.url}/instituto?nome=${filterParam.nome}&sigla=${filterParam.sigla}`);
  }

  listFilteredWithNivel(filterParam: CustomFilter): Observable<Instituto[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<Instituto[]>(`${this.url}/instituto/nivel?nome=${filterParam.nome}&sigla=${filterParam.sigla}&nivel=${filterParam.nivel}`);
  }

  save(t: Instituto): Observable<Instituto> {
    if (t.id) {
      return this.http.put<Instituto>(`${this.url}/admin/instituto`, t);
    }
    return this.http.post<Instituto>(`${this.url}/admin/instituto`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/instituto/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.sigla = filterParam.sigla === undefined ? '' : filterParam.sigla;
    filterParam.nivel = filterParam.nivel === undefined ? '' : filterParam.nivel;
    return filterParam;
  }

}
