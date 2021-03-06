import { take } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Estudante } from 'src/app/shared/model/estudante';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  emitSelectedOption = new EventEmitter<number>();
  url = environment.API;
  constructor(private http: HttpClient) {

  }

  public matericular(estudante: Estudante): Observable<Estudante> {
    return this.http.post<Estudante>(`${this.url}/matriculas`, estudante)
      .pipe(take(1));
  }

  public matericularConfirm(estudante: Estudante): Observable<Estudante> {
    return this.http.put<Estudante>(`${this.url}/matriculas/comfirm`, estudante)
      .pipe(take(1));
  }

}
