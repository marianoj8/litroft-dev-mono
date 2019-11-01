import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

import { Instituto } from './../../shared/model/instituto';
import { environment } from './../../../environments/environment.prod';
import { Curso } from 'src/app/shared/model/curso';
import { EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InstitutoService implements CustomRepository<Instituto, number> {

  emitSelectedInstituto = new EventEmitter<Instituto>();
  constructor(private http: HttpClient, private service: CrudService<Instituto, number>) {
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

  listFiltered(nome: string, sigla: string): Observable<Instituto[]> {
    return this.http.get<Instituto[]>(`${environment.API}/instituto?nome=${nome}&sigla=${sigla}`);
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
