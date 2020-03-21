import { CustomAbstractEntity } from './customEntity';
import { Provincia } from './provincia';
import { Municipio } from './municipio';

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
  numeroSerie: string;
  provincia: Provincia;
  municipio: Municipio;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
