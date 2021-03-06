import { EnsinoNivel } from './ensinoNivel';
import { Instituto } from './instituto';
import { Periodo } from './periodo';
import { Classe } from './classe';
import { Curso } from '../../shared/model/curso';
import { AdminInterno } from './adminInterno';
import { CustomAbstractEntity } from './customEntity';
import { Turma } from './turma';
import { Provincia } from './provincia';
import { Municipio } from './municipio';
import { AnoLetivo } from './support/AnoLetivo';

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
  ensinoNivel: EnsinoNivel;
  classe: Classe;
  periodo: Periodo;
  anoLetivo: AnoLetivo;
  adminInterno: AdminInterno;
  instituto: Instituto;
  numeroSerie: string;
  provincia: Provincia;
  municipio: Municipio;

  constructor(id?: number) {
    this.id = id ? id : null;
  }

}
