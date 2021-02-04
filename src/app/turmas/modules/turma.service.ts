import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Turma } from 'src/app/shared/model/turma';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

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

  getById(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.url}/interno/turma/${id}`);
  }

  list(): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l/c`);
  }

  filterByNome(filter?: CustomFilter): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l?nome=${!!filter?.sigla ? filter?.sigla : ''}`);
  }

  findByCurso(id: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l/c?curso=${!!id ? id : ''}&nome=5`);
  }

  save(t: Turma): Observable<Turma> {
    if (t.id) {
      return this.http.put<Turma>(`${this.url}/interno/turma`, t);
    }
    return this.http.post<Turma>(`${this.url}/interno/turma`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/turma/${id}`);
  }
}
