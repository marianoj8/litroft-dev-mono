import { CustomAbstractEntity } from './customEntity';
import { Departamento } from './departamento';
import { Grupo } from './grupo';
import { Projeto } from './projeto';

export class Monografia implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  paginas: number;
  departamento: Departamento;
  projeto: Projeto;
  fileid: string;
  file: File;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
