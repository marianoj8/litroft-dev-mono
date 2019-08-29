import { Injectable, EventEmitter } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { Grupo } from 'src/app/shared/model/grupo';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService implements CustomRepository<Grupo, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Grupo, number>) { }

  getById(id: number): Observable<Grupo> {
    return this.service.getById('grupo', id);
  }

  list(): Observable<Grupo[]> {
    return this.service.list('grupo/l');
  }

  filterByNomeDuracao(filter: CustomFilter): Observable<Grupo[]> {
    return this.service.list(`grupo/l`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Grupo[]> {
    return this.service
      .list(`grupo/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Grupo): Observable<Grupo> {
    if (t.id) {
      return this.service.update('grupo', t);
    }
    return this.service.save('grupo', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('grupo', id);
  }
}
