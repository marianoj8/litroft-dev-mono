import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Admin } from 'src/app/shared/model/admin';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CustomRepository<Admin, number> {


  url = `${environment.API}/interno/info`;
  constructor(
    private service: CrudService<Admin, number>,
    private http: HttpClient,
    public router: Router) { }


  getUserInfo(): Observable<boolean> {
    return this.http.get<boolean>(this.url)
      .pipe(
        take(1),
        //  catchError((err: HttpErrorResponse) => this.errorHandler(err))
      );
  }

  getById(id: number): Observable<Admin> {
    return this.service.getById('admin/admin', id);
  }

  list(): Observable<Admin[]> {
    return this.service.list('interno/admin/l?duracao=1');
  }

  filterByNomeDuracao(filter: CustomFilter): Observable<Admin[]> {
    return this.service.list(`interno/admin/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`)
      ;
  }

  filterByDuracao(duracao: number): Observable<Admin[]> {
    return this.service
      .list(`interno/admin/l?duracao=${!!duracao ? duracao : 1}`);
  }


  save(t: Admin): Observable<Admin> {
    if (t.id) {
      return this.service.update('interno/admin', t);
    }
    return this.service.save('interno/admin', t);
  }

  deleteById(id: number): Observable<void> {
    return this.service.deleteById('interno/admin', id);
  }

}
