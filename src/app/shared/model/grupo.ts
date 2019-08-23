import { CustomAbstractEntity } from './customEntity';

export class Grupo implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
}
