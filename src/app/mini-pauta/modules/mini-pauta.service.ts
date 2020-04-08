import { MiniPauta } from './../../shared/model/miniPauta';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MiniPautaService {
  constructor(public http: HttpClient) { }

  url = environment.API;
  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  public getMiniPauta(institutoId: number): Observable<MiniPauta[]> {
    return this.http.get<MiniPauta[]>(`${this.url}/interno/miniPauta/${institutoId}`)
      .pipe(
        take(1)
      );
  }

  public save(miniPauta: MiniPauta): Observable<MiniPauta> {
    if (miniPauta.id) {
      return this.http.put<MiniPauta>(`${this.url}/interno/miniPauta`, miniPauta)
        .pipe(take(1));
    }
    return this.http.post<MiniPauta>(`${this.url}/interno/miniPauta`, miniPauta)
      .pipe(take(1));
  }
}
