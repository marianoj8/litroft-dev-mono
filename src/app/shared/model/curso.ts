import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';

import { Departamento } from './departamento';

export class Curso implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  duracao: number;
  departamento: Departamento;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
