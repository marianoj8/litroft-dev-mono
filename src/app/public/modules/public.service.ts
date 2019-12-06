import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { Grupo } from 'src/app/shared/model/grupo';
import { environment } from 'src/environments/environment';

import { Instituto } from './../../shared/model/instituto';

@Injectable({ providedIn: 'root' })
export class PublicService {
  inPublicPage = new EventEmitter<boolean>();
  onChangeContextTitle = new EventEmitter<string>();
  onChangeContext = new EventEmitter<boolean>();
  emitMonoLink = new EventEmitter<string>();
  enableReadMode = new EventEmitter<boolean>();
  emitInstitutoList = new EventEmitter<Instituto[]>();
  public emitSelectedSchool = new EventEmitter<Instituto>();
  constructor(private http: HttpClient) { }

  listByInstitutoId(id: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${environment.API}/grupo/l/public/instituto/${id}`)
      .pipe(
        take(1),
        //  catchError((err: HttpErrorResponse) => this.errorHandler(err))
      );
  }

  list(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${environment.API}/grupo/l/public`)
      .pipe(
        take(1),
        //  catchError((err: HttpErrorResponse) => this.errorHandler(err))
      );
  }

}
