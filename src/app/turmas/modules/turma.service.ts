import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { Turma } from 'src/app/shared/model/turma';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';

@Injectable({
  providedIn: 'root'
})
export class TurmaService implements CustomRepository<Turma, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private service: CrudService<Turma, number>) { }

  getById(id: number): Observable<Turma> {
    return this.service.getById('interno/turma', id);
  }

  list(): Observable<Turma[]> {
    return this.service.list('interno/turma/l');
  }

  filterByNome(filter: CustomFilter): Observable<Turma[]> {
    return this.service.list(`interno/turma/l?sigla=${!!filter.sigla ? filter.sigla : ''}`);
  }

  findByCurso(id: number): Observable<Turma[]> {
    return this.service.list(`interno/turma/l/c?curso=${!!id ? id : ''}&nome=13`);
  }

  save(t: Turma): Observable<Turma> {
    if (t.id) {
      return this.service.update('interno/turma', t);
    }
    return this.service.save('interno/turma', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('interno/turma', id);
  }
}
