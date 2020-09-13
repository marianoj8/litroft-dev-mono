import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { Instituto } from 'src/app/shared/model/instituto';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class InstitutoService {
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();
  url = environment.API;
  emitSelectedInstituto = new EventEmitter<Instituto>();
  emitShowSearchBar = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  getById(id: number): Observable<Instituto> {
    return this.http.get<Instituto>(`/apiv1/litroft/api/v1/rm/instituto/${id}`);
  }

  list(): Observable<Instituto[]> {
    return this.http.get<Instituto[]>(`/apiv1/litroft/api/v1/rm/instituto`);
  }

  listCursoByInstituto(id: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`/apiv1/litroft/api/v1/rm/curso/l/instituto/${id}`);
  }

  listFiltered(filterParam: CustomFilter): Observable<Instituto[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<Instituto[]>(`/apiv1/litroft/api/v1/rm/instituto?nome=${filterParam.nome}&sigla=${filterParam.sigla}&numero=${filterParam.numero}&nivel=${filterParam.nivel}`);
  }

  listFilteredWithNivel(filterParam: CustomFilter): Observable<Instituto[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.
      get<Instituto[]>(`/apiv1/litroft/api/v1/rm/instituto/nivelid?nome=${filterParam.nome}&sigla=${filterParam.sigla}&numero=${filterParam.numero}&nivel=${filterParam.nivelId}`);
  }

  save(t: Instituto): Observable<Instituto> {
    if (t.id) {
      return this.http.put<Instituto>(`/apiv1/litroft/api/v1/rm/admin/instituto`, t);
    }
    return this.http.post<Instituto>(`/apiv1/litroft/api/v1/rm/admin/instituto`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`/apiv1/litroft/api/v1/rm/admin/instituto/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    filterParam.sigla = filterParam.sigla === undefined ? '' : filterParam.sigla;
    filterParam.nivelId = filterParam.nivel === undefined ? 0 : filterParam.nivelId;
    filterParam.nivel = filterParam.nivel === undefined ? '' : filterParam.nivel;
    filterParam.numero = filterParam.numero === undefined ? '' : filterParam.numero;
    return filterParam;
  }

}
