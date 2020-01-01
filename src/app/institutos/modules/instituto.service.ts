import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/model/curso';
import { Instituto } from 'src/app/shared/model/instituto';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class InstitutoService {
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();
  url = environment.API;
  emitSelectedInstituto = new EventEmitter<Instituto>();

  constructor(
    private http: HttpClient
  ) {}

  getById(id: number): Observable<Instituto> {
    return this.http.get<Instituto>(`${this.url}/instituto/${id}`);
  }

  list(): Observable<Instituto[]> {
    console.log(this.url);
    return this.http.get<Instituto[]>(`${this.url}/instituto`);
  }

  listCursoByInstituto(id: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/curso/l/${id}`);
  }

  listFiltered(filterParam: CustomFilter): Observable<Instituto[]> {
    filterParam = this.filterResolve(filterParam);
    return this.http.get<Instituto[]>(`${this.url}/instituto?nome=${filterParam.nome}&sigla=${filterParam.sigla}`);
  }

  save(t: Instituto): Observable<Instituto> {
    if (t.id) {
      return this.http.put<Instituto>('admin/instituto', t);
    }
    return this.http.post<Instituto>('admin/instituto', t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`admin/instituto/${id}`);
  }

  private filterResolve(filterParam: CustomFilter): CustomFilter {
    filterParam.nome = filterParam.nome === undefined ? '' : filterParam.nome;
    filterParam.sigla = filterParam.sigla === undefined ? '' : filterParam.sigla;
    return filterParam;
  }

}
