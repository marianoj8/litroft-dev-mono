import { AdminInterno } from './adminInterno';
import { Curso } from './curso';
import { CustomAbstractEntity } from './customEntity';
import { Orientador } from './orientador';
import { Turma } from './turma';

export class Grupo implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;
  posicao: string;
  turma: Turma;
  anoLetivo: number;
  orientador: Orientador;
  curso: Curso;
  adminInterno: AdminInterno;
  monografiaID: string;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
