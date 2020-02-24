import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Classe } from 'src/app/shared/model/classe';

@Injectable({ providedIn: 'root' })
export class ClasseService {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  url = environment.API;

  constructor(
    private http: HttpClient
  ) { }

  getById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.url}/classe/${id}`);
  }

  list(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.url}/classe`);
  }

  listClasseByNivelId(id: number): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.url}/classe/${id}`);
  }

  listFiltered(filterParam: CustomFilter): Observable<Classe[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<Classe[]>(`${this.url}/classe?descricao=${filterParam.descricao}`);
  }

  listFilteredWithNivel(filterParam: CustomFilter): Observable<Classe[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<Classe[]>(`${this.url}/classe/nivel?descricao=${filterParam.descricao}&nivel=${filterParam.nivel}`);
  }

  save(t: Classe): Observable<Classe> {
    if (t.id) {
      return this.http.put<Classe>(`${this.url}/admin/classe`, t);
    }
    return this.http.post<Classe>(`${this.url}/admin/classe`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/classe/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.sigla = filterParam.sigla === undefined ? '' : filterParam.sigla;
    filterParam.nivel = filterParam.nivel === undefined ? '' : filterParam.nivel;
    filterParam.nivelId = filterParam.nivelId === undefined ? 0 : filterParam.nivelId;
    return filterParam;
  }

}
