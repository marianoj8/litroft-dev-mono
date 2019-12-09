import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { AreaFormacao } from './../../shared/model/AreaFormacao';

@Injectable({
  providedIn: 'root'
})
export class AreaFormacaoService implements CustomRepository<AreaFormacao, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<AreaFormacao, number>) { }

  getById(id: number): Observable<AreaFormacao> {
    return this.service.getById('areaformacao', id);
  }

  list(): Observable<AreaFormacao[]> {
    return this.service.list('areaformacao');
  }

  filterByNomeDuracao(filter: CustomFilter): Observable<AreaFormacao[]> {
    return this.service.list(`areaformacao/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<AreaFormacao[]> {
    return this.service
      .list(`areaformacao/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: AreaFormacao): Observable<AreaFormacao> {
    if (t.id) {
      return this.service.update('admin/areaformacao', t);
    }
    return this.service.save('admin/areaformacao', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('admin/areaformacao', id);
  }
}
