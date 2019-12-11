import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';
import { Admin } from './admin';
import { Local } from './local';
import { AreaFormacao } from './AreaFormacao';

export class Instituto implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  sigla: string;
  numero: string;
  logoId: string;
  laboratorios: number;
  salas: number;
  cursos: number;
  local: Local;
  areaFormacao: AreaFormacao;
  admin: Admin;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
