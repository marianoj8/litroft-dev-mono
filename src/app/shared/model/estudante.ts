import { Curso } from '../../shared/model/curso';
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
  numeroProcesso: string;
  curso: Curso;
  inGruop: boolean;
  numeroSerie: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }

}
