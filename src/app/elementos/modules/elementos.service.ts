import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Elemento } from 'src/app/shared/model/elemento';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ElementoService {

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

  getById(id: number): Observable<Elemento> {
    return this.http.get<Elemento>(`${this.url}/interno/elemento/${id}`);
  }

  list(): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(`${this.url}/interno/elemento/l?descricao`);
  }

  listByParams(p: string, c: number, g: number): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(`${this.url}/interno/elemento/l?position=${p}&curso=${c}&grupo=${g}`);
  }

  filterByDuracao(duracao: number): Observable<Elemento[]> {
    return this.http
      .get<Elemento[]>(`${this.url}/interno/elemento/l?duracao=${!!duracao ? duracao : 1}`);
  }

  save(t: Elemento): Observable<Elemento> {
    if (t.id) {
      return this.http.put<Elemento>(`${this.url}/interno/elemento`, t);
    }
    return this.http.post<Elemento>(`${this.url}/interno/elemento`, t);
  }

  saveMulty(t: Elemento[]): Observable<Elemento[]> {
    return this.http.post<Elemento[]>(`${this.url}/interno/elemento/multy`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/elemento/${id}`);
  }
}
