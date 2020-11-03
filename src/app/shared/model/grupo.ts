import { AdminInterno } from './adminInterno';
import { Curso } from './curso';
import { CustomAbstractEntity } from './customEntity';
import { Orientador } from './orientador';
import { AnoLetivo } from './support/AnoLetivo';
import { Turma } from './turma';

export class Grupo implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;
  posicao: string;
  turma: Turma;
  anoLetivo: AnoLetivo;
  monoViewsCount: number;
  orientador: Orientador;
  curso: Curso;
  adminInterno: AdminInterno;
  monografiaID: string;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
