import { CustomAbstractEntity } from '../customEntity';

export class AnoLetivo implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  ano: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
