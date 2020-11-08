import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordenador } from 'src/app/shared/model/coordenador';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CoordenadorService {

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

  getById(id: number, institutoId: number): Observable<Coordenador> {
    return this.http.get<Coordenador>(`${this.url}/interno/coordenador/${id}`);
  }

  filterByNome(q: CustomFilter, institutoId: number): Observable<Coordenador[]> {
    return this.http.get<Coordenador[]>(`${this.url}/interno/coordenador?nome=${!!q.nome ? q.nome : ''}&institutoId=${institutoId}`);
  }

  list(q: CustomFilter, institutoId: number): Observable<Coordenador[]> {
    return this.http.get<Coordenador[]>(`${this.url}/interno/coordenador/l/instituto/${institutoId}?nome=${!!q.nome ? q.nome : ''}&cursoId=${!!q.cursoId ? q.cursoId : 1}&classeId=${!!q.classeId ? q.classeId : 1}&anoletivo=${!!q.anoLetivo ? q.anoLetivo : ''}`);
  }

  // filterByNomeSexoEspecialidade(filter: CustomFilter): Observable<Coordenador[]> {
  //   return this.http.get<Coordenador[]>('');
  // }
  // filterBySexoAndEspecialidade(filter: CustomFilter): Observable<Coordenador[]> {
  //   return this.http.get<Coordenador[]>('');
  // }

  save(t: Coordenador): Observable<Coordenador> {
    if (t.id) {
      return this.http.put<Coordenador>(`${this.url}/interno/coordenador`, t);
    }
    return this.http.post<Coordenador>(`${this.url}/interno/coordenador`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/coordenador/${id}`);
  }
}
