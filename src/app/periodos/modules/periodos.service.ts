import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Periodo } from 'src/app/shared/model/periodo';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PeriodoService {

  url = environment.API;

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.url}/periodo/${id}`);
  }

  list(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(`${this.url}/periodo`);
  }

  listFiltered(filterParam: CustomFilter): Observable<Periodo[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<Periodo[]>(`${this.url}/periodo?descricao=${filterParam.descricao}`);
  }

  save(t: Periodo): Observable<Periodo> {
    if (t.id) {
      return this.http.put<Periodo>(`${this.url}/admin/periodo`, t);
    }
    return this.http.post<Periodo>(`${this.url}/admin/periodo`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/periodo/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.sigla = filterParam.sigla === undefined ? '' : filterParam.sigla;
    filterParam.nivel = filterParam.nivel === undefined ? '' : filterParam.nivel;
    return filterParam;
  }

}
