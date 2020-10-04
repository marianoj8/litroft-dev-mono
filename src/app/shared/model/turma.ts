import { CustomAbstractEntity } from './customEntity';
import { Curso } from 'src/app/shared/model/curso';
import { Admin } from './admin';
import { AdminInterno } from './adminInterno';
import { Classe } from './classe';

export class Turma implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  sigla: string;
  curso: Curso;
  classe: Classe;
  adminInterno: AdminInterno;
  totalAlunos: number;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
