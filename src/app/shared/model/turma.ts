import { Curso } from 'src/app/shared/model/curso';

import { CustomAbstractEntity } from './customEntity';

export class Turma implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  sigla: string;
  curso: Curso;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
