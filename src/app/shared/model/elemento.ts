import { CustomAbstractEntity } from './customEntity';
import { Estudante } from './estudante';
import { Grupo } from './grupo';

export class ElementoGrupByMono implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  estudante: Estudante;
  grupo: Grupo;
}
