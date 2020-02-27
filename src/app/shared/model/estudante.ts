import { Periodo } from './periodo';
import { Classe } from './classe';
import { Curso } from '../../shared/model/curso';
import { AdminInterno } from './adminInterno';
import { CustomAbstractEntity } from './customEntity';
import { Turma } from './turma';
import { Provincia } from './provincia';
import { Municipio } from './municipio';

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
  turma: Turma;
  inGruop: boolean;
  nivel: string;
  classe: Classe;
  periodo: Periodo;
  anoLetivo: number;
  adminInterno: AdminInterno;
  numeroSerie: string;
  provincia: Provincia;
  municipio: Municipio;

  constructor(id?: number) {
    this.id = id ? id : null;
  }

}
