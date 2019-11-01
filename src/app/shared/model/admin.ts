import { CustomAbstractEntity } from './customEntity';

export class Admin implements CustomAbstractEntity {

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

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
