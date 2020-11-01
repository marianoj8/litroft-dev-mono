import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { AdminInterno } from './adminInterno';
import { Classe } from './classe';
import { Curso } from './curso';
import { Departamento } from './departamento';
import { Professor } from './professor';

export class Coordenador implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  professor: Professor;
  curso: Curso;
  classe: Classe;
  anoletivo: string;
  adminInterno: AdminInterno;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
