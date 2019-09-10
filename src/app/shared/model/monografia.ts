import { CustomAbstractEntity } from './customEntity';
import { Departamento } from './departamento';

export class Monografia implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  tema: string;
  totalPagina: number;
  departamento: Departamento;

}
