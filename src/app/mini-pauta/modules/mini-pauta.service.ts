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

  public getMiniPauta(institutoId: Number): Observable<MiniPauta[]> {
    return this.http.get<MiniPauta[]>(`${this.url}/pauta/${institutoId}`)
      .pipe(
        take(1)
      );
  }
}
