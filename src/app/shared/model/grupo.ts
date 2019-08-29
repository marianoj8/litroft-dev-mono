import { CustomAbstractEntity } from './customEntity';
import { Orientador } from './orientador';
import { Monografia } from './monografia';
import { Turma } from './turma';
import { Curso } from './curso';

export class Grupo implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;
  turma: Turma;
  anoLetivo: number;
  monografia: Monografia;
  orientador: Orientador;
  curso: Curso;
}
