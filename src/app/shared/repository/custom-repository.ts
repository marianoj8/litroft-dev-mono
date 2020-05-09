import { Observable } from 'rxjs';
import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';

export interface CustomRepository<T extends CustomAbstractEntity, ID extends number> {

  getById(id: ID): Observable<T>;

  list(): Observable<T[]>;

  save(t: T): Observable<T>;

  deleteById(id: ID): Observable<void>;
}
