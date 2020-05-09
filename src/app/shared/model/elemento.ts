import { AdminInterno } from './adminInterno';
import { Curso } from './curso';
import { CustomAbstractEntity } from './customEntity';
import { Estudante } from './estudante';
import { Grupo } from './grupo';
import { Orientador } from './orientador';

export class Elemento implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  estudante: Estudante;
  orientador: Orientador;
  grupo: Grupo;
  curso: Curso;
  posicao: string;
  adminInterno: AdminInterno;

  constructor(
    id?: number,
    estudante?: Estudante,
    orientador?: Orientador,
    grupo?: Grupo,
    curso?: Curso,
    posicao?: string,
    adminInterno?: AdminInterno) {

    this.id = id ? id : null;
    this.estudante = estudante ? estudante : null;
    this.orientador = orientador ? orientador : null;
    this.grupo = grupo ? grupo : null;
    this.curso = curso ? curso : null;
    this.posicao = posicao ? posicao : null;
    this.adminInterno = this.adminInterno ? this.adminInterno : null;
  }
}
