import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Curso } from 'src/app/shared/model/curso';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CustomRepository } from './../../shared/repository/custom-repository';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CursoService implements CustomRepository<Curso, number> {
  constructor(private service: CrudService<Curso, number>) { }

  getById(id: number): Observable<Curso> {
    return this.service.getById('curso', id);
  }

  list(): Observable<Curso[]> {
    return this.service.list('curso');
  }

  save(t: Curso): Observable<Curso> {
    if (t.id) {
      return this.service.update('curso', t);
    }
    return this.service.save('curso', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('curso', id);
  }
}
