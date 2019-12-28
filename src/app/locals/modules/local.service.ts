import { Injectable, EventEmitter } from '@angular/core';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Local } from 'src/app/shared/model/local';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LocalService implements CustomRepository<Local, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

 constructor(private service: CrudService<Local, number>) { }

  getById(id: number): Observable<Local> {
    return this.service.getById('interno/local', id);
  }

  list(): Observable<Local[]> {
    return this.service.list('local');
  }

  filterByNome(filter: CustomFilter): Observable<Local[]> {
    return this.service.list(`local?destrito=${!!filter.nome ? filter.nome : ''}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Local[]> {
    return this.service
      .list(`interno/local/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Local): Observable<Local> {
    if (t.id) {
      return this.service.update('admin/local', t);
    }
    return this.service.save('admin/local', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('admin/local', id);
  }
}
