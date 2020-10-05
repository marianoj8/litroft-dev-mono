import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigTable } from '../../model/configtable';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  public getConfigByInstituto(institutoId: number): Observable<ConfigTable> {
    return this.http.get<ConfigTable>(`${environment.API}/config/instituto/${institutoId}`);
  }
}
