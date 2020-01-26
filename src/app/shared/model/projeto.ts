import { CustomAbstractEntity } from './customEntity';
import { Departamento } from './departamento';
import { Grupo } from './grupo';

export class Projeto implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  tema: string;
  grupo: Grupo;
  departamento: Departamento;
  monografiaID: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
