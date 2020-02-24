import { Admin } from './admin';
import { CustomAbstractEntity } from './customEntity';
import { EnsinoNivel } from './ensinoNivel';
export class Classe implements CustomAbstractEntity {
  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  descricao: string;
  nivel: string;
  ensinoNivel: EnsinoNivel;
  adminEntity: Admin;
}
