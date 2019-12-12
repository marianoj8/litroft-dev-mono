import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';

import { Admin } from './admin';
import { AreaFormacao } from './AreaFormacao';
import { Local } from './local';
import { SobreInstituto } from './sobreInstituto';

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
  oficinas: number;
  salas: number;
  cursos: number;
  local: Local;
  areaFormacao: AreaFormacao;
  admin: Admin;
  sobreInstituto: SobreInstituto;

  constructor(id?: number) {
    this.id = id ? id : null;
  }
}
