import { Injectable, EventEmitter } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { AdminInterno } from 'src/app/shared/model/adminInterno';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatTableDataSource } from '@angular/material';
import { CrudService } from 'src/app/shared/https/crud/crud.http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminInternoService implements CustomRepository<AdminInterno, number> {

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  AdminInternoTable: MatTableDataSource<AdminInterno[]>;
  constructor(private http: HttpClient) {

  }

  getById(id: number): Observable<AdminInterno> {
    return this.http.get<AdminInterno>(`${this.url}/admin/adminInterno/${id}`);
  }

  list(): Observable<AdminInterno[]> {
    return this.http.get<AdminInterno[]>(`${this.url}/admin/adminInterno`);
  }

  filterByNomeSexo(filterParam: CustomFilter): Observable<AdminInterno[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http
      .get<AdminInterno[]>(`${this.url}/admin/adminInterno?nome=${filterParam.nome}&sexo=${filterParam.sexo}`);
  }

  filterBySexoAndEspecialidade(filterParam: CustomFilter): Observable<AdminInterno[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http
      .get<AdminInterno[]>(`${this.url}/admin/adminInterno?sexo=${filterParam.sexo}`);
  }

  save(t: AdminInterno): Observable<AdminInterno> {

    if (t.id) {
      return this.http.put<AdminInterno>(`${this.url}/admin/adminInterno`, t);
    }
    return this.http.post<AdminInterno>(`${this.url}/admin/adminInterno`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/admin/adminInterno${id}`);
  }

  filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.sexo = filterParam.sexo === undefined ? '' : filterParam.sexo;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    return filterParam;
  }

}
