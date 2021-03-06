import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  url = environment.API;
  constructor(
    private http: HttpClient,
    public router: Router) { }


  getUserInfo(): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/interno/info`)
      .pipe(
        take(1),
        //  catchError((err: HttpErrorResponse) => this.errorHandler(err))
      );
  }

  // getById(id: number): Observable<Admin> {
  //   return this.http.getById('admin/admin', id);
  // }

  // list(): Observable<Admin[]> {
  //   return this.http.list('interno/admin/l?duracao=1');
  // }

  // filterByNomeDuracao(filter: CustomFilter): Observable<Admin[]> {
  //   return this.http.list(`interno/admin/l?nome=${!!filter.nome ? filter.nome : ''}&duracao=${!!filter.duracao ? filter.duracao : 1}`)
  //     ;
  // }

  // filterByDuracao(duracao: number): Observable<Admin[]> {
  //   return this.http
  //     .list(`interno/admin/l?duracao=${!!duracao ? duracao : 1}`);
  // }


  // save(t: Admin): Observable<Admin> {
  //   if (t.id) {
  //     return this.http.update('interno/admin', t);
  //   }
  //   return this.http.save('interno/admin', t);
  // }

  // deleteById(id: number): Observable<void> {
  //   return this.http.deleteById('interno/admin', id);
  // }

}
