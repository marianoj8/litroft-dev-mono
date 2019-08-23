import { EventEmitter, Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/Operators';

import { Estudante } from 'src/app/shared/model/estudante';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CustomRepository } from './../../shared/repository/custom-repository';



@Injectable({
  providedIn: 'root'
})
export class EstudanteService implements CustomRepository<Estudante, number> {

  findValueParam = new EventEmitter<string>();
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
    return this.service.getById('estudante', id);
  }

  list(): Observable<Estudante[]> {
    return this.service.list('estudante/l');
  }

  filterByNomeSexoCurso(filter: CustomFilter): Observable<Estudante[]> {
    return this.service.list(`estudante/l?nome=${!!filter.nome ? filter.nome : ''}&curso=${!!filter.curso ? filter.curso : ''}&sexo=${!!filter.sexo ? filter.sexo : ''}`)
    ;
  }

  filterBySexoAndCurso(curso: string, sexo: string): Observable<Estudante[]> {
    return this.service
      .list(`estudante/l?curso=${!!curso ? curso : ''}&sexo=${!!sexo ? sexo : ''}`);
  }

  save(t: Estudante): Observable<Estudante> {

    if (t.id) {
      console.log('Update');
      return this.service.update('estudante', t);
    }
    console.log('Saved');
    return this.service.save('estudante', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('estudante', id);
  }

}

