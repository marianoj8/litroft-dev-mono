import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {

  onChangeContextTitle = new EventEmitter<string>();
  mostrarMenu = new EventEmitter<boolean>();
  onChangeContext = new EventEmitter<boolean>();
}
