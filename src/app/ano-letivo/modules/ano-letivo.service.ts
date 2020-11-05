import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { AnoLetivo } from 'src/app/shared/model/support/AnoLetivo';

@Injectable({ providedIn: 'root' })
export class AnoLetivoService {
  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  isPortable = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<AnoLetivo> {
    return this.http.get<AnoLetivo>(`${this.url}/anoletivo/${id}`);
  }

  list(ano: string): Observable<AnoLetivo[]> {
    return this.http.get<AnoLetivo[]>(`${this.url}/anoletivo?ano=${!!ano ? ano : ''}`);
  }

  save(t: AnoLetivo): Observable<AnoLetivo> {
    if (t.id) {
      return this.http.put<AnoLetivo>(`${this.url}/interno/anoletivo`, t);
    }
    return this.http.post<AnoLetivo>(`${this.url}/interno/anoletivo`, t);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/interno/anoletivo/${id}`);
  }
}
