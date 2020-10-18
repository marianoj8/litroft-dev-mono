import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordenacao } from 'src/app/shared/model/coordenacao';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CoordenacaoService {

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

  getById(id: number): Observable<Coordenacao> {
    return this.http.get<Coordenacao>(`${this.url}/interno/especialidade/${id}`);
  }

  list(): Observable<Coordenacao[]> {
    return this.http.get<Coordenacao[]>(`${this.url}/interno/especialidade/l`);
  }

  filterByNome(q: CustomFilter): Observable<Coordenacao[]> {
    return this.http.get<Coordenacao[]>(`${this.url}/interno/especialidade/l?descricao=${!!q.nome ? q.nome : ''}`);
  }

  save(t: Coordenacao): Observable<Coordenacao> {
    if (t.id) {
      return this.http.put<Coordenacao>(`${this.url}/interno/especialidade`, t);
    }
    return this.http.post<Coordenacao>(`${this.url}/interno/especialidade`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/especialidade/${id}`);
  }
}
