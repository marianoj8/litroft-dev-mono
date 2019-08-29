import { Injectable, EventEmitter } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { Departamento } from 'src/app/shared/model/departamento';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartamentoService implements CustomRepository<Departamento, number> {


  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Departamento, number>) { }

  getById(id: number): Observable<Departamento> {
    return this.service.getById('departamento', id);
  }

  list(): Observable<Departamento[]> {
    return this.service.list('departamento/l');
  }

  filterByNome(filter: CustomFilter): Observable<Departamento[]> {
    return this.service.list(`departamento/l?nome=${!!filter.nome ? filter.nome : ''}`);
  }

  save(t: Departamento): Observable<Departamento> {
    if (t.id) {
      return this.service.update('departamento', t);
    }
    return this.service.save('departamento', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('departamento', id);
  }
}
