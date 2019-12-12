import { CustomAbstractEntity } from './customEntity';

export class SobreInstituto implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  informacao: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
