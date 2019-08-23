import { CustomAbstractEntity } from './customEntity';

export class Departamento implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;

}
