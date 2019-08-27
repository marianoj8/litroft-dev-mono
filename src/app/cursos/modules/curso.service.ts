import { EventEmitter, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { Estudante } from 'src/app/shared/model/estudante';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

import { CustomRepository } from './../../shared/repository/custom-repository';

@Injectable({
  providedIn: 'root'
})
export class CursoService implements CustomRepository<Curso, number> {


  findValueParam = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  estudanteTable: MatTableDataSource<Estudante[]>;

  constructor(private service: CrudService<Curso, number>) { }

  getById(id: number): Observable<Curso> {
    return this.service.getById('curso', id);
  }

  list(): Observable<Curso[]> {
    return this.service.list('curso/l?duracao=1');
  }

  filterByNomeDuracao(filter: CustomFilter): Observable<Curso[]> {
    return this.service.list(`curso/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Curso[]> {
    return this.service
      .list(`curso/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Curso): Observable<Curso> {
    if (t.id) {
      return this.service.update('curso', t);
    }
    return this.service.save('curso', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('curso', id);
  }
}
