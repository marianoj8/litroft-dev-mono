import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Turma } from 'src/app/shared/model/turma';
import { environment } from 'src/environments/environment';

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
  private entityId = localStorage.getItem('entityId');

  constructor(private http: HttpClient) {
    this.entityId = localStorage.getItem('entityId');
  }

  getById(id: number): Observable<Turma> {
    this.entityId = localStorage.getItem('entityId');
    return this.http.get<Turma>(`${this.url}/interno/turma/${id}?institutoId=${this.entityId}`);
  }

  list(): Observable<Turma[]> {
    this.entityId = localStorage.getItem('entityId');
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l?institutoId=${this.entityId}`);
  }

  filterByNome(filter: CustomFilter): Observable<Turma[]> {
    this.entityId = localStorage.getItem('entityId');
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l?sigla=${!!filter.sigla ? filter.sigla : ''}&institutoId=${this.entityId}`);
  }

  findByCurso(id: number): Observable<Turma[]> {
    this.entityId = localStorage.getItem('entityId');
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l/c?curso=${!!id ? id : ''}&nome=13&institutoId=${this.entityId}`);
  }

  findByCursoPublic(id: number, instituto: number): Observable<Turma[]> {
    this.entityId = localStorage.getItem('entityId');
    return this.http.get<Turma[]>(`${this.url}/turma/l/curso/instituto?curso=${!!id ? id : ''}&nome=10&institutoId=${this.entityId}`);
  }

  findAllByCurso(id: number): Observable<Turma[]> {
    this.entityId = localStorage.getItem('entityId');
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l/c?curso=${!!id ? id : ''}&institutoId=${this.entityId}`);
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
