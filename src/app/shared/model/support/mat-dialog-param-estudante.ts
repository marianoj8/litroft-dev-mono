import { AdminInterno } from '../adminInterno';
import { Classe } from '../classe';
import { Curso } from '../curso';
import { EnsinoNivel } from '../ensinoNivel';
import { Instituto } from '../instituto';
import { Municipio } from '../municipio';
import { Periodo } from '../periodo';
import { Provincia } from '../provincia';
import { Turma } from '../turma';

export class MatDailogParamEstudante {
  id: number;
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
  turma?: Turma;
  inGruop: boolean;
  nivel: string;
  ensinoNivel: EnsinoNivel;
  classe: Classe;
  periodo: Periodo;
  anoLetivo: number;
  adminInterno: AdminInterno;
  instituto: Instituto;
  numeroSerie: string;
  provincia: Provincia;
  municipio: Municipio;
}
