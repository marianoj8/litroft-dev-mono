import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';

import { AdminInterno } from './adminInterno';

export class Especialidade implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;
  adminInterno: AdminInterno;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
