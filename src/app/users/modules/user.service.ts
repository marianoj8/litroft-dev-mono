import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUser } from 'src/app/shared/model/application-user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private url: string = environment.API;

    constructor(private http:HttpClient){}

    public listUser(): Observable<ApplicationUser[]> {
        return this.http.get<ApplicationUser[]>(`${this.url}/users`);
    }

}
