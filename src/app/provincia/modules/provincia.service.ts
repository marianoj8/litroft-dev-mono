import { Injectable, EventEmitter } from '@angular/core';
import { Provincia } from '../../shared/model/provincia';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';

@Injectable({ providedIn: 'root' })
export class ProvinciaService implements CustomRepository<Provincia, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Provincia, number>) { }

  getById(id: number): Observable<Provincia> {
    return this.service.getById('interno/provincia', id);
  }

  list(): Observable<Provincia[]> {
    return this.service.list('interno/provincia');
  }

  filterByNome(filter: CustomFilter): Observable<Provincia[]> {
    return this.service.list(`interno/provincia/?nome=${!!filter.nome ? filter.nome : ''}`);
  }

  save(t: Provincia): Observable<Provincia> {
    if (t.id) {
      return this.service.update('admin/provincia', t);
    }
    return this.service.save('admin/provincia', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('admin/provincia', id);
  }
}
