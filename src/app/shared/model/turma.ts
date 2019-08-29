import { CustomAbstractEntity } from './customEntity';
import { Curso } from 'src/app/shared/model/curso';

export class Turma implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  sigla: string;
  curso: Curso;
}
