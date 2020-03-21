import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private XSRFTOKEN: string;
  constructor(private autService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.autService.getToken();
    if (currentUser) {

      this.XSRFTOKEN = document.cookie.replace('XSRF-TOKEN=', '');

      request = request.clone({
        headers: new HttpHeaders({
          Authorization: currentUser,
          'X-XSRF-TOKEN': this.XSRFTOKEN
        })
      });
    }
    return next.handle(request);
  }



}
