import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { environment } from 'src/environments/environment';
import { Provincia } from '../../shared/model/provincia';

@Injectable({ providedIn: 'root' })
export class ProvinciaService implements CustomRepository<Provincia, number> {

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

  getById(id: number): Observable<Provincia> {
    return this.http.get<Provincia>(`${this.url}/provincia/${id}`);
  }

  list(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.url}/provincia`);
  }

  filterByNome(filter: CustomFilter): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.url}/provincia/?nome=${!!filter.nome ? filter.nome : ''}`);
  }

  save(t: Provincia): Observable<Provincia> {
    if (t.id) {
      return this.http.put<Provincia>(`${this.url}/admin/provincia`, t);
    }
    return this.http.post<Provincia>(`${this.url}/admin/provincia`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/provincia/${id}`);
  }
}
