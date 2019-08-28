import { Injectable, EventEmitter } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { Especialidade } from 'src/app/shared/model/especialidade';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';

@Injectable({ providedIn: 'root' })
export class EspecialidadeService implements CustomRepository<Especialidade, number> {

  findValueParam = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Especialidade, number>) { }

  getById(id: number): Observable<Especialidade> {
    return this.service.getById('especialidade', id);
  }

  list(): Observable<Especialidade[]> {
    return this.service.list('especialidade/l');
  }

  filterByNome(filter: CustomFilter): Observable<Especialidade[]> {
    return this.service.list(`especialidade/l?descricao=${!!filter.nome ? filter.nome : ''}`);
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
