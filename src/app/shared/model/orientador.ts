import { AdminInterno } from './adminInterno';
import { CustomAbstractEntity } from './customEntity';
import { Especialidade } from './especialidade';
import { Provincia } from './provincia';
import { Municipio } from './municipio';

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
  adminInterno: AdminInterno;
  numeroSerie: string;
  provincia: Provincia;
  municipio: Municipio;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
