import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HomeService {

  onChangeContextTitle = new EventEmitter<string>();
  onDataChanged = new EventEmitter<number>();
}
