import { Injectable, EventEmitter } from '@angular/core';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Observable } from 'rxjs';
import { Monografia } from 'src/app/shared/model/monografia';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class MonografiaService {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Monografia, number>) { }

  getById(id: number): Observable<Monografia> {
    return this.service.getById('monografia', id);
  }

  list(): Observable<Monografia[]> {
    return this.service.list('monografia/l?duracao=1');
  }

  filterByNomeDuracao(filter: CustomFilter): Observable<Monografia[]> {
    return this.service.list(`monografia/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Monografia[]> {
    return this.service
      .list(`monografia/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Monografia): Observable<Monografia> {
    if (t.id) {
      return this.service.update('monografia', t);
    }
    return this.service.save('monografia', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('monografia', id);
  }
}

