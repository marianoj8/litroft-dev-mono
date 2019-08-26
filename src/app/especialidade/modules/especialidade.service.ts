import { Injectable } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { Especialidade } from 'src/app/shared/model/especialidade';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EspecialidadeService implements CustomRepository<Especialidade, number> {
  constructor(private service: CrudService<Especialidade, number>) { }

  getById(id: number): Observable<Especialidade> {
    return this.service.getById('especialidade', id);
  }

  list(): Observable<Especialidade[]> {
    return this.service.list('especialidade');
  }

  save(t: Especialidade): Observable<Especialidade> {
    if (t.id) {
      return this.service.update('especialidade', t);
    }
    return this.service.save('especialidade', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('especialidade', id);
  }
}
