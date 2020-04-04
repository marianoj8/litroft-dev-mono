import { Admin } from './admin';
import { CustomAbstractEntity } from './customEntity';
import { EnsinoNivel } from './ensinoNivel';
import { Classe } from './classe';
export class Diciplina implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  classe: Classe;
}
