import { Curso } from '../../shared/model/curso';
import { CustomAbstractEntity } from './customEntity';

export class Estudante implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;

  // id: number;
  nome: string;
  sobreNome: string;
  sexo: string;
  dataNascimento: string;
  bi: string;
  fone: string;
  email: string;
  endereco: string;
  curso: Curso;

}
