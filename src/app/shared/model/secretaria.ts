import { AdminInterno } from 'src/app/shared/model/adminInterno';
import { CustomAbstractEntity } from './customEntity';
import { Municipio } from './municipio';
import { Provincia } from './provincia';

export class Secretaria implements CustomAbstractEntity {

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
  adminInterno: AdminInterno;
  provincia: Provincia;
  municipio: Municipio;
  numeroSerie: string;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
