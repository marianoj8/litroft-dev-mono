import { CustomAbstractEntity } from './customEntity';
import { Admin } from './admin';
import { AdminInterno } from './adminInterno';

export class Departamento implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  totalCurso: number;
  adminInterno: AdminInterno;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
