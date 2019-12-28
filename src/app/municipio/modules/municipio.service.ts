import { Injectable, EventEmitter } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { Observable } from 'rxjs';
import { Municipio } from 'src/app/shared/model/monicipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService implements CustomRepository<Municipio, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Municipio, number>) { }

  getById(id: number): Observable<Municipio> {
    return this.service.getById('interno/municipio', id);
  }

  list(): Observable<Municipio[]> {
    return this.service.list('interno/municipio');
  }

  filterByNome(filter: CustomFilter): Observable<Municipio[]> {
    return this.service.list(`interno/municipio?destrito=${!!filter.nome ? filter.nome : ''}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Municipio[]> {
    return this.service
      .list(`interno/municipio/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Municipio): Observable<Municipio> {
    if (t.id) {
      return this.service.update('admin/municipio', t);
    }
    return this.service.save('admin/municipio', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('admin/municipio', id);
  }
}
