import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUser } from 'src/app/shared/model/application-user';
import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private url: string = environment.API;

  findValueParam = new EventEmitter<string>();
  onChangeContextTitle = new EventEmitter<string>();
  findValueParamFromServer = new EventEmitter<CustomFilter>();
  findValueParams = new EventEmitter<CustomFilter>();
  onChangeContext = new EventEmitter<boolean>();
  isPortable = new EventEmitter<boolean>();
  emitOnDetalheButtonCliked = new EventEmitter<number>();
  emitOnEditButtonCliked = new EventEmitter<number>();
  emitOnDeleteButtonCliked = new EventEmitter<number>();

  constructor(private http:HttpClient){}

    public listUser(): Observable<ApplicationUser[]> {
        return this.http.get<ApplicationUser[]>(`${this.url}/users`);
    }

    filterByNomeDuracao(data: CustomFilter) {
      throw new Error('Method not implemented.');
    }
    filterByDuracao(arg0: number) {
      throw new Error('Method not implemented.');
    }
    deleteById(cursoId: number) {
      throw new Error('Method not implemented.');
    }

}
