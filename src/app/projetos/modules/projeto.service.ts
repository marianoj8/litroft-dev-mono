import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Projeto } from 'src/app/shared/model/projeto';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';

@Injectable({ providedIn: 'root' })
export class ProjetoService implements CustomRepository<Projeto, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Projeto, number>) { }

  getById(id: number): Observable<Projeto> {
    return this.service.getById('interno/projeto', id);
  }

  list(): Observable<Projeto[]> {
    return this.service.list('interno/projeto/l?duracao=1');
  }

  filterByNomeDuracao(filter: CustomFilter): Observable<Projeto[]> {
    return this.service.list(`interno/projeto/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`);
  }

  filterByDuracao(duracao: number): Observable<Projeto[]> {
    return this.service
      .list(`interno/projeto/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Projeto): Observable<Projeto> {
    if (t.id) {
      return this.service.update('interno/projeto', t);
    }
    return this.service.save('interno/projeto', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('interno/projeto', id);
  }
}
