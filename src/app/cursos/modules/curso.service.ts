import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Curso } from 'src/app/shared/model/curso';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  isPortable = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.url}/interno/curso/${id}`);
  }

  list(institutoId: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/interno/curso/l?institutoId=${institutoId}`);
  }

  publicList(institutoId: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/curso/public/instituto/${institutoId}`);
  }

  filterByNomeDuracao(q: CustomFilter, instituoId: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/interno/curso/l?nome=${!!q.nome ? q.nome : ''}&duracao=${!!q.duracao ? q.duracao : 1}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Curso[]> {
    return this.http
      .get<Curso[]>(`${this.url}/interno/curso/l?duracao=${!!duracao ? duracao : 1}`);
  }

  save(t: Curso): Observable<Curso> {
    if (t.id) {
      return this.http.put<Curso>(`${this.url}/interno/curso`, t);
    }
    return this.http.post<Curso>(`${this.url}/interno/curso`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/curso/${id}`);
  }
}
