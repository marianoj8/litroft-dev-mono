import { Injectable } from '@angular/core';
import { CustomRepository } from 'src/app/shared/repository/custom-repository';
import { Admin } from 'src/app/shared/model/admin';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Observable } from 'rxjs';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, catchError, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CustomRepository<Admin, number> {


  url = `${environment.API}/admin/info`;
  constructor(
    private service: CrudService<Admin, number>,
    private http: HttpClient,
    public router: Router) { }


  getUserInfo(): Observable<Admin> {
    return this.http.get<Admin>(this.url)
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
