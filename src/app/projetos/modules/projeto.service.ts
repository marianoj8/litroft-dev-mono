import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Projeto } from 'src/app/shared/model/projeto';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ProjetoService {

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

  getById(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.url}/interno/projeto/${id}`);
  }

  list(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.url}/interno/projeto/l?duracao=1`);
  }

  filterByNomeDuracao(q: CustomFilter): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.url}/interno/projeto/l?nome=${!!q.nome ? q.nome : ''}&duracao=${!!q.duracao ? q.duracao : 1}`);
  }

  filterByDuracao(duracao: number): Observable<Projeto[]> {
    return this.http
      .get<Projeto[]>(`${this.url}/interno/projeto/l?duracao=${!!duracao ? duracao : 1}`);
  }

  save(t: Projeto): Observable<Projeto> {
    if (t.id) {
      return this.http.put<Projeto>(`${this.url}/interno/projeto`, t);
    }
    return this.http.post<Projeto>(`${this.url}/interno/projeto`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/projeto/${id}`);
  }
}
