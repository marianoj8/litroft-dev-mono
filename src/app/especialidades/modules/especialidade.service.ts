import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Especialidade } from 'src/app/shared/model/especialidade';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class EspecialidadeService {

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

  getById(id: number): Observable<Especialidade> {
    return this.http.get<Especialidade>(`${this.url}/interno/especialidade/${id}`);
  }

  list(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${this.url}/interno/especialidade/l`);
  }

  filterByNome(q: CustomFilter): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${this.url}/interno/especialidade/l?descricao=${!!q.nome ? q.nome : ''}`);
  }

  save(t: Especialidade): Observable<Especialidade> {
    if (t.id) {
      return this.http.put<Especialidade>(`${this.url}/interno/especialidade`, t);
    }
    return this.http.post<Especialidade>(`${this.url}/interno/especialidade`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/especialidade/${id}`);
  }
}
