import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { Grupo } from 'src/app/shared/model/grupo';
import { environment } from 'src/environments/environment';

import { CustomFilter } from '../../shared/model/support/custom-filter';
import { Instituto } from './../../shared/model/instituto';

@Injectable({ providedIn: 'root' })
export class PublicService {
  url = environment.API;
  pdfSrc = '';
  inPublicPage = new EventEmitter<boolean>();
  onChangeContextTitle = new EventEmitter<string>();
  onChangeContext = new EventEmitter<boolean>();
  emitMonoLink = new EventEmitter<string>();
  enableReadMode = new EventEmitter<boolean>();
  emitInstitutoList = new EventEmitter<Instituto[]>();
  inFilterMonografias = new EventEmitter<CustomFilter>();
  public emitSelectedSchool = new EventEmitter<Instituto>();
  constructor(
    private http: HttpClient,
  ) {

  }

  loadFileFromAPI(id: string) {
    const localapi1 = this.url.replace('apiv1', '');
    // this.pdfSrc = `http://localhost:8080${localapi1}/mono/download/${id}`;
    this.pdfSrc = `${localapi1}/mono/download/${id}`;
  }


  listByInstitutoId(id?: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.url}/grupo/l/public/instituto/${id}`)
      .pipe(
        take(1),
        //  catchError((err: HttpErrorResponse) => this.errorHandler(err))
      );
  }

  list(descricao?: string): Observable<Grupo[]> {
    descricao = descricao === undefined ? '' : descricao;
    return this.http.get<Grupo[]>(`${this.url}/grupo/l/public?descricao=${descricao}`)
      .pipe(
        take(1),
        //  catchError((err: HttpErrorResponse) => this.errorHandler(err))
      );
  }

  listByDescription(descricao?: string): Observable<Grupo[]> {
    descricao = descricao === undefined ? '' : descricao;
    return this.http.get<Grupo[]>(`${this.url}}/grupo/l/public?descricao=${descricao}`)
      .pipe(
        take(1),
        //  catchError((err: HttpErrorResponse) => this.errorHandler(err))
      );
  }
}
