import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Elemento } from 'src/app/shared/model/elemento';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

@Injectable({ providedIn: 'root' })
export class ElementoService implements CustomRepository<Elemento, number> {


  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Elemento, number>) { }

  getById(id: number): Observable<Elemento> {
    return this.service.getById('interno/elemento', id);
  }

  list(): Observable<Elemento[]> {
    return this.service.list('interno/elemento/l?descricao');
  }

  listByParams(p: string, c: number, g: number): Observable<Elemento[]> {
    return this.service.list(`interno/elemento/l?position=${p}&curso=${c}&grupo=${g}`);
  }

  // filterByNomeDuracao(filter: CustomFilter): Observable<Elemento[]> {
  //   return this.service.list(`elemento/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`)
  //     ;
  // }

  filterByDuracao(duracao: number): Observable<Elemento[]> {
    return this.service
      .list(`interno/elemento/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Elemento): Observable<Elemento> {
    if (t.id) {
      return this.service.update('interno/elemento', t);
    }
    return this.service.save('interno/elemento', t);
  }

  saveMulty(t: Elemento[]): Observable<Elemento[]> {
    return this.service.saveMany('interno/elemento/multy', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('interno/elemento', id);
  }
}
