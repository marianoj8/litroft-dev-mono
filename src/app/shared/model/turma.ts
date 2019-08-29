import { CustomAbstractEntity } from './customEntity';

export class Turma implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  sigla: string;
}
