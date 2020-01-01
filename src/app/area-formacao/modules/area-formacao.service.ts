import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';

import { AreaFormacao } from './../../shared/model/AreaFormacao';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AreaFormacaoService {

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

  getById(id: number): Observable<AreaFormacao> {
    return this.http.get<AreaFormacao>(`${this.url}/areaformacao/${id}`);
  }

  list(): Observable<AreaFormacao[]> {
    return this.http.get<AreaFormacao[]>(`${this.url}/areaformacao`);
  }

  filterByDescription(filter: CustomFilter): Observable<AreaFormacao[]> {
    return this.http.get<AreaFormacao[]>(`${this.url}/areaformacao?descricao=${!!filter.descricao ? filter.descricao : ''}`)
      ;
  }

  save(t: AreaFormacao): Observable<AreaFormacao> {
    if (t.id) {
      return this.http.put<AreaFormacao>(`${this.url}/admin/areaformacao`, t);
    }
    return this.http.post<AreaFormacao>(`${this.url}/admin/areaformacao`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/areaformacao/${id}`);
  }
}
