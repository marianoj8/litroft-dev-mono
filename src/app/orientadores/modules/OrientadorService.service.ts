import { Injectable, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Orientador } from 'src/app/shared/model/orientador';
import { Observable } from 'rxjs';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';

@Injectable({ providedIn: 'root' })
export class OrientadorService implements CustomRepository<Orientador, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  OrientadorTable: MatTableDataSource<Orientador[]>;
  constructor(private service: CrudService<Orientador, number>) {

  }

  getById(id: number): Observable<Orientador> {
    return this.service.getById('interno/orientador', id);
  }

  list(): Observable<Orientador[]> {
    return this.service.list('interno/orientador/l');
  }

  filterByNomeSexoEspecialidade(filter: CustomFilter): Observable<Orientador[]> {
    return this.service.list(`interno/orientador/l?nome=${!!filter.nome ? filter.nome : ''}&sexo=${!!filter.sexo ? filter.sexo : ''}&especialidade=${!!filter.descricao ? filter.descricao : ''}`);
  }

  filterBySexoAndEspecialidade(sexo: string, descricao: string): Observable<Orientador[]> {
    return this.service
      .list(`interno/orientador/l?sexo=${!!sexo ? sexo : ''}&especialidade=${!!descricao ? descricao : ''}`);
  }

  save(t: Orientador): Observable<Orientador> {

    if (t.id) {
      console.log('Update');
      return this.service.update('interno/orientador', t);
    }
    console.log('Saved');
    return this.service.save('interno/orientador', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('interno/orientador', id);
  }

}


