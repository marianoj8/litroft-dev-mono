import { AdminInterno } from './adminInterno';
import { CustomAbstractEntity } from './customEntity';
import { Especialidade } from './especialidade';
import { Provincia } from './provincia';
import { Municipio } from './municipio';

export class Professor implements CustomAbstractEntity {
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
  numeroSerie: string;
  provincia: Provincia;
  municipio: Municipio;


  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
