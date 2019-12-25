import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Curso } from 'src/app/shared/model/curso';
import { Instituto } from 'src/app/shared/model/instituto';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class InstitutoService implements CustomRepository<Instituto, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  emitSelectedInstituto = new EventEmitter<Instituto>();
  constructor(
    private http: HttpClient,
    private service: CrudService<Instituto, number>
  ) {

  }

  getById(id: number): Observable<Instituto> {
    return this.service.getById('instituto', id);
  }

  list(): Observable<Instituto[]> {
    return this.http.get<Instituto[]>(`${environment.API}/instituto`);
  }

  listCursoByInstituto(id: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${environment.API}/curso/l/${id}`);
  }

  listFiltered(nome: string): Observable<Instituto[]> {
    return this.http.get<Instituto[]>(`${environment.API}/instituto`);
  }

  save(t: Instituto): Observable<Instituto> {
    if (t.id) {
      return this.service.update('admin/instituto', t);
    }
    return this.service.save('admin/instituto', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('admin/instituto', id);
  }

}
