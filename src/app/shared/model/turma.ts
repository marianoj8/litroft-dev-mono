import { CustomAbstractEntity } from './customEntity';
import { Curso } from 'src/app/shared/model/curso';
import { Admin } from './admin';
import { AdminInterno } from './adminInterno';

export class Turma implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  sigla: string;
  curso: Curso;
  adminInterno: AdminInterno;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
