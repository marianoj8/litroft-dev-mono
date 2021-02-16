import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomFilter } from 'src/app/shared/model/support/custom-filter';
import { environment } from 'src/environments/environment';
import { Vitrine } from 'src/app/shared/model/vitrine';

@Injectable({
    providedIn: 'root'
})
export class vitrineService {
    url = environment.API;
    findValueParam = new EventEmitter<string>();
    onChangeContextTitle = new EventEmitter<string>();
    findValueParamFromServer = new EventEmitter<CustomFilter>();
    findValueParams = new EventEmitter<CustomFilter>();
    onChangeContext = new EventEmitter<boolean>();
    emitOnDetalheButtonCliked = new EventEmitter<number>();
    emitOnEditButtonCliked = new EventEmitter<number>();
    emitOnDeleteButtonCliked = new EventEmitter<number>();

    constructor(private http: HttpClient) { }

    getById(id: number): Observable<Vitrine> {
        return this.http.get<Vitrine>(`${this.url}/interno/vitrine/${id}`);
    }
    }
