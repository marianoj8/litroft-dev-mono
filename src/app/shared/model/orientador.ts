import { CustomAbstractEntity } from './customEntity';
import { Especialidade } from './especialidade';

export class Orientador implements CustomAbstractEntity {
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
  especialidade: Especialidade;
  numeroSerie: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
