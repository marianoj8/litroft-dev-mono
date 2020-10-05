import { Instituto } from './instituto';
import { CustomAbstractEntity } from './customEntity';

export class ConfigTable implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  turmaLimite: number;
  instituto: Instituto;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
