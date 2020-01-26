import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';

export class Especialidade implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
