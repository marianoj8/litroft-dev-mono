import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Municipio } from 'src/app/shared/model/monicipio';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

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

  getById(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.url}/interno/municipio/${id}`);
  }

  list(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.url}/interno/municipio`);
  }

  filterByNomeAndProvincia(filter: CustomFilter): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.url}/interno/municipio/l/${!!filter.provinciaId ? filter.provinciaId : 1}?destrito=${!!filter.nome ? filter.nome : ''}`)
      ;
  }

  filterByNome(filter: CustomFilter): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.url}/interno/municipio?destrito=${!!filter.nome ? filter.nome : ''}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Municipio[]> {
    return this.http
      .get<Municipio[]>(`${this.url}/interno/municipio/l?duracao=${!!duracao ? duracao : 1}`);
  }

  save(t: Municipio): Observable<Municipio> {
    if (t.id) {
      return this.http.put<Municipio>(`${this.url}/admin/municipio`, t);
    }
    return this.http.post<Municipio>(`${this.url}/admin/municipio`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/municipio/${id}`);
  }
}
