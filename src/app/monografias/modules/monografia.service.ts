import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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


  save(t: Monografia) {
    const formData: FormData = new FormData();
    formData.append('file', t.file);

    console.log(formData);
    console.log(t.file);

    const header = new HttpHeaders({
      'Content-type': 'application/pdf'
      // Authorization: currentUser
    });

    const request = new HttpRequest('POST', `${environment.API}/interno/mono/uploadFile1`, formData).clone({
      headers: new HttpHeaders({
        'Content-type': 'application/json, text/plain, */*',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        Authorization: localStorage.getItem('token')
      })
    });

    return this.http.request(request)
      .subscribe(res => console.log(res));
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('monografia', id);
  }

}

