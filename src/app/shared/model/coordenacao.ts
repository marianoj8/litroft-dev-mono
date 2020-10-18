import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { AdminInterno } from './adminInterno';
import { Departamento } from './departamento';

export class Coordenacao implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  duracao: number;
  departamento: Departamento;
  adminInterno: AdminInterno;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
