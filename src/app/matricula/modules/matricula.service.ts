import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  emitSelectedOption = new EventEmitter<number>();

  constructor(private http: HttpClient) {

  }

}
