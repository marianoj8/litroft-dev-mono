import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Departamento } from 'src/app/shared/model/departamento';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class DepartamentoService {

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

  getById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.url}/interno/departamento/${id}`);
  }

  list(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.url}/interno/departamento/l`);
  }

  filterByNome(filter: CustomFilter): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.url}/interno/departamento/l?nome=${!!filter.nome ? filter.nome : ''}`);
  }

  save(t: Departamento): Observable<Departamento> {
    if (t.id) {
      return this.http.put<Departamento>(`${this.url}/interno/departamento`, t);
    }
    return this.http.post<Departamento>(`${this.url}/interno/departamento`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/departamento/${id}`);
  }
}
