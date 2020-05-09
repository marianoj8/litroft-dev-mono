import { CustomAbstractEntity } from './customEntity';
import { Classe } from './classe';
export class Diciplina implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  classe: Classe;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
