import { CustomAbstractEntity } from 'src/app/shared/model/customEntity';

export class Curso implements CustomAbstractEntity {

  id: number;
  createdAt: string;
  lastModifiedAt: string;
  totalModified: number;
  nome: string;
  duracao: number;
}
