import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/security/auth.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private autService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.autService.getToken();
    if (currentUser) {

      request = request.clone({
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: currentUser
        })
      });
    }
    return next.handle(request);
  }

}
