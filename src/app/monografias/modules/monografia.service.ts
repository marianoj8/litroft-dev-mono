import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators/delay';

import { Monografia } from 'src/app/shared/model/monografia';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonografiaService {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();
  emitShowAddButton = new EventEmitter<boolean>();
  emitStatusUploader = new EventEmitter<any>();

  departamentoId: number;
  grupoId: number;
  projeto: number;
  pagina: number;

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Monografia> {
    return this.http.get<Monografia>(`${this.url}/interno/monografia/${id}`);
  }
  getOneById(id: string): Observable<Monografia> {
    return this.http.get<Monografia>(`${this.url}/monografia/${id}`);
  }

  list(): Observable<Monografia[]> {
    return this.http.get<Monografia[]>(`${this.url}/interno/monografia/l?duracao=1`);
  }

  filterByNomeDuracao(q: CustomFilter): Observable<Monografia[]> {
    q = this.filterResolve(q);
    return this.http
      .get<Monografia[]>(`${this.url}/interno/monografia/l?nome=${q.nome}&duracao=${q.duracao}`);
  }

  filterByDuracao(duracao: number): Observable<Monografia[]> {
    return this.http
      .get<Monografia[]>(`${this.url}/interno/monografia/l?duracao=${!!duracao ? duracao : 1}`);
  }

  save(t: Monografia): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', t.file);
    this.departamentoId = t.departamento.id;
    this.grupoId = t.projeto.grupo.id;
    this.pagina = t.paginas;
    this.projeto = t.projeto.id;
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>(`${this.url}/interno/mono/uploadFile?departamentoId=${this.departamentoId}&grupoId=${this.grupoId}&paginas=${this.pagina}&projetoId=${this.projeto}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      delay(2000),
    );
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/monografia/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.duracao = filterParam.duracao === undefined ? 1 : filterParam.duracao;
    return filterParam;
  }

}

