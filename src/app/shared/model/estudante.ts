import { Curso } from '../../shared/model/curso';
import { AdminInterno } from './adminInterno';
import { CustomAbstractEntity } from './customEntity';

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
  curso: Curso;
  inGruop: boolean;
  adminInterno: AdminInterno;

  constructor(id?: number) {
    this.id = id ? id : null;
  }

}
