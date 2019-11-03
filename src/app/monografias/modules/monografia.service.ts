import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monografia } from 'src/app/shared/model/monografia';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonografiaService {

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();
  emitShowAddButton = new EventEmitter<boolean>();

  constructor(private service: CrudService<Monografia, number>, private http: HttpClient) { }

  getById(id: number): Observable<Monografia> {
    return this.service.getById('interno/monografia', id);
  }

  list(): Observable<Monografia[]> {
    return this.service.list('interno/monografia/l?duracao=1');
  }

  filterByNomeDuracao(filter: CustomFilter): Observable<Monografia[]> {
    return this.service.list(`interno/monografia/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Monografia[]> {
    return this.service
      .list(`interno/monografia/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Monografia): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', t.file);

    return this.http.post<any>(`${environment.API}/interno/mono/uploadFile?departamentoId=${t.departamento.id}&grupoId=${t.projeto.grupo.id}&paginas=${t.paginas}&projetoId=${t.projeto.id}`, formData,{
      reportProgress:true,
      observe: 'events'
    });
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('monografia', id);
  }

}

