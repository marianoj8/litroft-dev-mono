import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Local } from 'src/app/shared/model/local';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

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

  getById(id: number): Observable<Local> {
    return this.http.get<Local>(`${this.url}/interno/local/${id}`);
  }

  list(): Observable<Local[]> {
    return this.http.get<Local[]>(`${this.url}/local`);
  }

  filterByNome(filter: CustomFilter): Observable<Local[]> {
    return this.http.get<Local[]>(`${this.url}/local?destrito=${!!filter.nome ? filter.nome : ''}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Local[]> {
    return this.http
      .get<Local[]>(`${this.url}/interno/local/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Local): Observable<Local> {
    if (t.id) {
      return this.http.put<Local>(`${this.url}/admin/local`, t);
    }
    return this.http.post<Local>(`${this.url}/admin/local`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/local/${id}`);
  }
}
