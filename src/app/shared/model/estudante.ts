import { Curso } from '../../shared/model/curso';
import { AdminInterno } from './adminInterno';
import { CustomAbstractEntity } from './customEntity';
import { Turma } from './turma';

export class Estudante implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  sobreNome: string;
  sexo: string;
  dataNascimento: string;
  bi: string;
  fone: string;
  email: string;
  endereco: string;
  numeroProcesso: string;
  curso: Curso;
  turma: Turma;
  inGruop: boolean;
  adminInterno: AdminInterno;
  numeroSerie: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }

}
