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

  constructor(private http: HttpClient) {
  }

  getById(id: number, institutoId: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.url}/interno/turma/${id}?institutoId=${institutoId}`);
  }

  list(institutoId: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l?institutoId=${institutoId}`);
  }

  filterByNome(filter: CustomFilter, institutoId: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l?sigla=${!!filter.sigla ? filter.sigla : ''}&institutoId=${institutoId}`);
  }

  filterByCursoAndClasse(filter: CustomFilter, institutoId: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l/curso/classe?sigla=${!!filter.sigla ? filter.sigla : ''}&cursoId=${filter.cursoId}&classeId=${filter.classeId}&institutoId=${institutoId}`);
  }

  findByCursoPublic(id: number, institutoId: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/turma/l/curso/instituto?curso=${!!id ? id : ''}&nome=10&institutoId=${institutoId}`);
  }

  findAllByCurso(id: number, institutoId: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${this.url}/interno/turma/l/c?cursoId=${!!id ? id : ''}&institutoId=${institutoId}`);
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
