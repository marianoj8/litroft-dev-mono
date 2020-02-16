import { Instituto } from './instituto';
import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { AdminInterno } from './adminInterno';
import { Departamento } from './departamento';

export class Curso implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nivel: number;
  instituto: Instituto;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
