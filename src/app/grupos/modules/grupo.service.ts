import { Injectable, EventEmitter } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { Grupo } from 'src/app/shared/model/grupo';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';
import { Estudante } from 'src/app/shared/model/estudante';

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
  emitSelectedElements = new EventEmitter<Estudante[]>();

  constructor(private service: CrudService<Grupo, number>) { }

  getById(id: number): Observable<Grupo> {
    return this.service.getById('interno/grupo', id);
  }

  list(): Observable<Grupo[]> {
    return this.service.list('interno/grupo/l');
  }

  listByDescricao(descricao: string): Observable<Grupo[]> {
    descricao = descricao === undefined ? '' : descricao;
    return this.service.list(`interno/grupo/l?descricao=${descricao}`);
  }

  listPublic(): Observable<Grupo[]> {
    return this.service.list('grupo/l/public');
  }

  filterByDescricaoAndTow(filter: CustomFilter): Observable<Grupo[]> {
    filter = this.filterResolve(filter);
    return this.service.list(`interno/grupo/l?descricao=${filter.descricao}&curso=${filter.curso}&turma=${filter.turma}`);
  }

  filterByDuracao(duracao: number): Observable<Grupo[]> {
    return this.service
      .list(`interno/grupo/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Grupo): Observable<Grupo> {
    if (t.id) {
      console.log('Updating');
      return this.service.update('interno/grupo', t);
    }
    return this.service.save('interno/grupo', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('interno/grupo', id);
  }

  private filterResolve(filter: CustomFilter): CustomFilter {
    filter.descricao = filter.descricao === undefined ? '' : filter.descricao;
    filter.curso = filter.curso === undefined ? '' : filter.curso;
    filter.turma = filter.turma === undefined ? '' : filter.turma;
    return filter;
  }
}
