import { CustomFilter } from './../../shared/model/support/custom-filter';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diciplina } from 'src/app/shared/model/diciplina';

@Injectable({ providedIn: 'root' })
export class DiciplinaService {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Diciplina> {
    return this.http.get<Diciplina>(`${this.url}/diciplina/${id}`);
  }

  getAllByInstitutoId(id: number): Observable<Diciplina[]> {
    return this.http.get<Diciplina[]>(`${this.url}/diciplina/institito/${id}`);
  }

  list(filter: CustomFilter): Observable<Diciplina[]> {
    filter = this.filterResolve(filter);
    return this.http.get<Diciplina[]>(`${this.url}/diciplina?nome=${filter.nome}&institutoId=${filter.institutoId}`);
  }

  filterByNome(filter: CustomFilter): Observable<Diciplina[]> {
    return this.http.get<Diciplina[]>(`${this.url}/diciplina/?nome=${!!filter.nome ? filter.nome : ''}`);
  }

  save(t: Diciplina): Observable<Diciplina> {
    if (t.id) {
      return this.http.put<Diciplina>(`${this.url}/admin/diciplina`, t);
    }
    return this.http.post<Diciplina>(`${this.url}/admin/diciplina`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/diciplina/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.sigla = filterParam.sigla === undefined ? '' : filterParam.sigla;
    filterParam.nivelId = filterParam.nivel === undefined ? 0 : filterParam.nivelId;
    filterParam.nivel = filterParam.nivel === undefined ? '' : filterParam.nivel;
    filterParam.numero = filterParam.numero === undefined ? '' : filterParam.numero;
    filterParam.institutoId = filterParam.institutoId === undefined ? 0 : filterParam.institutoId;
    return filterParam;
  }

}
