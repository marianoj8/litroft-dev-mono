import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CustomAbstractEntity } from '../../model/customEntity';
import { AuthService } from '../security/auth.service';
import { NotificationService } from './../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T extends CustomAbstractEntity, ID extends number> {

  url = `${environment.API}/admin/`;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private notificationService: NotificationService) { }

  getById(uri: string, id: number): Observable<T> {
    if (this.authService.isTokenEpired()) {
      return this.http.get<T>(this.url + uri + '/' + id)
        .pipe(
          take(1),
           catchError((err: HttpErrorResponse) => this.errorHandler(err))
        );
    }
  }



  list(uri: string): Observable<T[]> {
    if (this.authService.isTokenEpired()) {
      return this.http.get<T[]>(this.url + uri)
        .pipe(
          take(1),
           catchError((err: HttpErrorResponse) => this.errorHandler(err))
        );
    }
  }

  save(uri: string, t: T): Observable<T> {
    if (this.authService.isTokenEpired()) {
      return this.http.post<T>(this.url + uri, t)
        .pipe(
          take(1),
           catchError((err: HttpErrorResponse) => this.errorHandler(err))
        );
    }
  }

  update(uri: string, t: T): Observable<T> {
    if (this.authService.isTokenEpired()) {
      return this.http.put<T>(this.url + uri, t)
        .pipe(
          take(1),
          catchError((err: HttpErrorResponse) => this.errorHandler(err))
        );
    }
  }

  deleteById(uri: string, id: number): Observable<void> {
    if (this.authService.isTokenEpired()) {
      return this.http.delete<void>(this.url + uri + '/' + id)
        .pipe(
          take(1),
           catchError((err: HttpErrorResponse) => this.errorHandler(err))
        );
    }
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
