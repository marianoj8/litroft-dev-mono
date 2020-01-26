import { CustomAbstractEntity } from './customEntity';

export class Departamento implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  totalCurso: number;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
