import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

export interface CustomRepository<T extends CustomAbstractEntity, ID extends number> {

  getById(id: ID): Observable<T>;

  list(): Observable<T[]>;

  save(t: T): Observable<T>;

  deleteById(id: ID): Observable<void>;
}
