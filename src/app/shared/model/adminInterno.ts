import { CustomAbstractEntity } from './customEntity';
import { Instituto } from './instituto';
import { Admin } from './admin';

export class AdminInterno implements CustomAbstractEntity {

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
  instituto: Instituto;
  admin: Admin;
  numeroSerie: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
