import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { Admin } from './admin';
import { Monicipio } from './monicipio';
import { Provincia } from './provincia';

export class Local implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  distrito: string;
  municipio: Monicipio;
  provincia: Provincia;
  admin: Admin;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
