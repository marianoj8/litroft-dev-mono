import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monografia } from 'src/app/shared/model/monografia';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/internal/operators/delay';
import { filter } from 'rxjs/operators';

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
  emitStatusUploader = new EventEmitter<any>();

  departamentoId: number;
  grupoId: number;
  projeto: number;
  pagina: number;
  url = environment.API;

  constructor(private service: CrudService<Monografia, number>, private http: HttpClient) { }

  getById(id: number): Observable<Monografia> {
    return this.service.getById('interno/monografia', id);
  }

  list(): Observable<Monografia[]> {
    return this.service.list('interno/monografia/l?duracao=1');
  }

  filterByNomeDuracao(filterParam: CustomFilter): Observable<Monografia[]> {
    filterParam = this.filterResolve(filterParam);
    return this.service
      .list(`interno/monografia/l?nome=${filterParam.nome}&duracao=${filterParam.duracao}`);
  }

  filterByDuracao(duracao: number): Observable<Monografia[]> {
    return this.service
      .list(`interno/monografia/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Monografia): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', t.file);
    this.departamentoId = t.departamento.id;
    this.grupoId = t.projeto.grupo.id;
    this.pagina = t.paginas;
    this.projeto = t.projeto.id;
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>(`${this.url}/interno/mono/uploadFile?departamentoId=${this.departamentoId}&grupoId=${this.grupoId}&paginas=${this.pagina}&projetoId=${this.projeto}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      delay(2000),
    );
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('monografia', id);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.duracao = filterParam.duracao === undefined ? 1 : filterParam.duracao;
    return filterParam;
  }

}

