import { CustomAbstractEntity } from './customEntity';
export class Periodo implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;
  tipo: string;
  isAdulto: boolean;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
