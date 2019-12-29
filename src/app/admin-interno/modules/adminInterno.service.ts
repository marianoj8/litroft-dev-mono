import { Injectable, EventEmitter } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { AdminInterno } from 'src/app/shared/model/adminInterno';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { MatTableDataSource } from '@angular/material';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminInternoService implements CustomRepository<AdminInterno, number> {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  AdminInternoTable: MatTableDataSource<AdminInterno[]>;
  constructor(private service: CrudService<AdminInterno, number>) {

  }

  getById(id: number): Observable<AdminInterno> {
    return this.service.getById('admin/adminInterno', id);
  }

  list(): Observable<AdminInterno[]> {
    return this.service.list('admin/adminInterno');
  }

  filterByNomeSexo(filterParam: CustomFilter): Observable<AdminInterno[]> {
    filterParam = this.filterResolve(filterParam);
    return this.service
      .list(`admin/adminInterno?nome=${filterParam.nome}&sexo=${filterParam.sexo}`);
  }

  filterBySexoAndEspecialidade(filterParam: CustomFilter): Observable<AdminInterno[]> {
    filterParam = this.filterResolve(filterParam);
    return this.service
      .list(`admin/adminInterno?sexo=${filterParam.sexo}`);
  }

  save(t: AdminInterno): Observable<AdminInterno> {

    if (t.id) {
      console.log('Update');
      return this.service.update('admin/adminInterno', t);
    }
    console.log('Saved');
    return this.service.save('admin/adminInterno', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('admin/adminInterno', id);
  }

  filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.sexo = filterParam.sexo === undefined ? '' : filterParam.sexo;
    filterParam.descricao = filterParam.descricao === undefined ? '' : filterParam.descricao;
    return filterParam;
  }

}
