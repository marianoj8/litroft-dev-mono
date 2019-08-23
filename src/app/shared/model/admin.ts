import { CustomAbstractEntity } from './customEntity';

export class Admin implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
}
