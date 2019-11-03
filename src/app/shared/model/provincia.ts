import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { Admin } from './admin';

export class Provincia implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  admin: Admin;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
