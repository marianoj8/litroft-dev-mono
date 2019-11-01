import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { Admin } from './admin';

export class Local implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  municipio: string;
  provincia: string;
  admin: Admin;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
