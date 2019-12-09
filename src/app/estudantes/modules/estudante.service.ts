import { EventEmitter, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

import { Estudante } from 'src/app/shared/model/estudante';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CustomRepository } from './../../shared/repository/custom-repository';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService implements CustomRepository<Estudante, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  estudanteTable: MatTableDataSource<Estudante[]>;
  constructor(private service: CrudService<Estudante, number>) {
  }

  getById(id: number): Observable<Estudante> {
    return this.service.getById('interno/estudante', id);
  }

  list(): Observable<Estudante[]> {
    return this.service.list('interno/estudante/l');
  }

  filterByNomeSexoCurso(filter: CustomFilter): Observable<Estudante[]> {
    return this.service.list(`interno/estudante/l?nome=${!!filter.nome ? filter.nome : ''}&curso=${!!filter.curso ? filter.curso : ''}&sexo=${!!filter.sexo ? filter.sexo : ''}`);
  }

  filterBySexoAndCurso(curso: string, sexo: string): Observable<Estudante[]> {
    return this.service
      .list(`interno/estudante/l?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}`);
  }

  filterBySexoAndCursoAndPosition(curso: string, sexo: string, p: string): Observable<Estudante[]> {
    return this.service
      .list(`interno/estudante/l?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}&posicao=${!!p ? p : ''}`);
  }

  filterBySexoAndCursoAngGroup(curso: string, sexo: string, isGroup: boolean): Observable<Estudante[]> {
    return this.service
      .list(`interno/estudante/l/g?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}&isGroup=${!!isGroup ? isGroup : false}`);
  }

  save(t: Estudante): Observable<Estudante> {

    if (t.id) {
      console.log('Update');
      return this.service.update('interno/estudante', t);
    }
    console.log('Saved');
    return this.service.save('interno/estudante', t);
  }

  set(t: Estudante[]): Observable<Estudante[]> {
    return this.service.setGruop('interno/estudante/set', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('interno/estudante', id);
  }

}

